// https://github.com/web3-storage/example-image-gallery
import { Web3Storage } from 'web3.storage/dist/bundle.esm.min.js'

import { jsonFile, makeGatewayURL } from './helpers'
import { Password, encryptBlob } from './encryption'

export async function getLinks(ipfsPath) {
  const url = `https://dweb.link/api/v0/ls?arg=${encodeURIComponent(ipfsPath)}`
  const res = await fetch(url)
  const data = await res.json()
  let links = []
  data.Objects[0].Links.forEach((obj) => {
    const newObj = Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
    )
    links.push(newObj)
  })
  return links
}

function makeStorageClient() {
  return new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN })
}

export async function storeFiles(
  files,
  password,
  caption,
  addresses,
  version,
  callback,
  isText
) {
  // The name for our upload includes a prefix we can use to identify our files later
  let uploadName
  if (process.env.NAME_PREFIX) {
    uploadName = `${process.env.NAME_PREFIX} | ${Password.generate(20)}`
  } else {
    uploadName = Password.generate(20)
  }

  // We store some metadata about the image alongside the image file.
  // The metadata includes the file path, which we can use to generate
  // a URL to the full image.
  let metadata = {
    files: {},
    text: isText,
    caption,
    addresses,
  }
  let uploadedFiles = []
  for (const k of Object.keys(files)) {
    metadata.files[files[k].file.name] = files[k].originalName
    uploadedFiles.push(files[k].file)
  }
  const metadataFile = jsonFile('metadata.json', metadata)
  const versionFile = new File([String(version)], 'VERSION', {
    type: 'text/plain',
  })
  uploadedFiles.push(versionFile)
  const encryptedMetadata = await encryptBlob(metadataFile, password, true)
  uploadedFiles.push(encryptedMetadata.file)
  const web3storage = makeStorageClient()
  console.log(`> 🤖 calculating content ID for files`)
  const totalSize = uploadedFiles.map((f) => f.size).reduce((a, b) => a + b, 0)
  let uploaded = 0
  const cid = await web3storage.put(uploadedFiles, {
    // the name is viewable at https://web3.storage/files and is included in the status and list API responses
    name: uploadName,

    // onRootCidReady will be called as soon as we've calculated the Content ID locally, before uploading
    onRootCidReady: (localCid) => {
      console.log(`> 🔑 locally calculated Content ID: ${localCid} `)
      console.log('> 📡 sending files to web3.storage ')
    },

    // onStoredChunk is called after each chunk of data is uploaded
    onStoredChunk: (bytes) => {
      // console.log(`total size: ${totalSize} current bytes: ${bytes} uploaded: ${uploaded}`)
      console.log(`> 🛰 sent ${bytes.toLocaleString()} bytes to web3.storage`)
      uploaded += bytes
      const pct = (100 * uploaded) / totalSize
      console.log(`Uploading... ${pct.toFixed(2)}% complete`)
      callback(Number(pct.toFixed(1)))
    },
  })
  return cid
}

export async function getEncryptedMetadata(cid) {
  const url = makeGatewayURL(cid, 'metadata.json.enc')
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(
      `error fetching image metadata: [${res.status}] ${res.statusText}`
    )
  }
  const encryptedBlob = await res.blob()
  return encryptedBlob
}

export async function checkStatus(cid) {
  const client = makeStorageClient()
  const status = await client.status(cid)
  console.log(status)
  return status
}

export async function getFileStream(cid, filename, callback, arg) {
  const url = makeGatewayURL(cid, filename)
  let response = await fetch(url)
  if (!response.ok){
    throw 'Could not fetch file, try again.'
  }
  const reader = response.body.getReader()
  const contentLength = response.headers.get('Content-Length')
  console.log(contentLength)
  let receivedLength = 0
  let chunks = []
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      break
    }
    chunks.push(value)
    receivedLength += value.length
    if (callback) {
      const pct = 100 * (receivedLength / contentLength)
      callback(arg, pct)
    }
  }
  let Uint8Chunks = new Uint8Array(receivedLength),
    position = 0
  for (let chunk of chunks) {
    Uint8Chunks.set(chunk, position)
    position += chunk.length
  }
  const blob = new Blob([Uint8Chunks])
  return blob
}
