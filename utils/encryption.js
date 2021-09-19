export const Password = {
  _pattern: /[a-zA-Z0-9\_\-]/,

  _getRandomByte: function () {
    // http://caniuse.com/#feat=getrandomvalues
    if (window.crypto && window.crypto.getRandomValues) {
      var result = new Uint8Array(1)
      window.crypto.getRandomValues(result)
      return result[0]
    } else if (window.msCrypto && window.msCrypto.getRandomValues) {
      var result = new Uint8Array(1)
      window.msCrypto.getRandomValues(result)
      return result[0]
    } else {
      return Math.floor(Math.random() * 256)
    }
  },

  generate: function (length) {
    return Array.apply(null, { length: length })
      .map(function () {
        var result
        while (true) {
          result = String.fromCharCode(this._getRandomByte())
          if (this._pattern.test(result)) {
            return result
          }
        }
      }, this)
      .join('')
  },
}

const getPasswordKey = (password) =>
  window.crypto.subtle.importKey(
    'raw',
    new TextEncoder('utf-8').encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )

const deriveKey = (passwordKey, salt, keyUsage) =>
  window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 250000,
      hash: 'SHA-256',
    },
    passwordKey,
    { name: 'AES-GCM', length: 256 },
    false,
    keyUsage
  )

export async function encryptBlob(blob, password, useFilename) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16))
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const passwordKey = await getPasswordKey(password)
  const aesKey = await deriveKey(passwordKey, salt, ['encrypt'])
  const data = await blob.arrayBuffer()
  const encryptedContent = await window.crypto.subtle.encrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    aesKey,
    data
  )

  const encryptedContentArr = new Uint8Array(encryptedContent)
  let buff = new Uint8Array(
    salt.byteLength + iv.byteLength + encryptedContentArr.byteLength
  )
  buff.set(salt, 0)
  buff.set(iv, salt.byteLength)
  buff.set(encryptedContentArr, salt.byteLength + iv.byteLength)
  let filename = useFilename ? blob.name : Password.generate(10)
  const file = new File([buff], filename + '.enc', {
    type: blob.type,
  })
  return { file: file, originalName: blob.fullPath || blob.name }
}

export async function decryptBlob(encryptedBlob, password) {
  const encryptedDataBuff = await encryptedBlob.arrayBuffer()
  const salt = encryptedDataBuff.slice(0, 16)
  const iv = encryptedDataBuff.slice(16, 16 + 12)
  const data = encryptedDataBuff.slice(16 + 12)
  const passwordKey = await getPasswordKey(password)
  const aesKey = await deriveKey(passwordKey, salt, ['decrypt'])
  const decryptedContent = await window.crypto.subtle.decrypt(
    {
      name: 'AES-GCM',
      iv: iv,
    },
    aesKey,
    data
  )
  return new Blob([decryptedContent])
}
