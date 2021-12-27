// https://github.com/web3-storage/example-image-gallery
export const MAX_TOTAL_SIZE = Number(
  process.env.MAX_TOTAL_SIZE || 31 * 1024 * 1024 * 1024 - 2 * 1024 * 1024
) // using 2 MiB for metadata
export const MAXSIZE = Number(process.env.MAXSIZE || 2 * 1024 * 1024 * 1024 - 1)
export function makeGatewayURL(cid, path) {
  return `https://${cid}.ipfs.dweb.link/${encodeURIComponent(path)}`
}

export function jsonFile(filename, obj) {
  return new File([JSON.stringify(obj)], filename, { type: 'application/json' })
}

export function formatSize(val) {
  let sym
  let size = val
  if (val > 1e9) {
    sym = 'GB'
    size = size / 1e9
  } else if (val > 1e6) {
    sym = 'MB'
    size = size / 1e6
  } else if (val > 1e3) {
    sym = 'KB'
    size = size / 1e3
  } else {
    sym = 'Bytes'
  }
  return `${size.toFixed(2).toLocaleString()} ${sym}`
}

export function saveFile(file, name) {
  let link = document.createElement('a')
  link.href = URL.createObjectURL(file)
  link.download = name || file.name
  link.click() // Save
}
