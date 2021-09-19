// var JsSHA = require('jssha/src/sha256')
var Blake256 = require('./blake256')
var keccak256 = require('./sha3')['keccak256']
var Blake2B = require('./blake2b')
const BECH32 = require('./bech32')

function numberToHex (number) {
  var hex = Math.round(number).toString(16)
  if (hex.length === 1) {
    hex = '0' + hex
  }
  return hex
}

module.exports = {
  bech32: BECH32,
  toHex: function (arrayOfBytes) {
    var hex = ''
    for (var i = 0; i < arrayOfBytes.length; i++) {
      hex += numberToHex(arrayOfBytes[i])
    }
    return hex
  },
  sha256: async function(str) {
    // Get the string as arraybuffer.
    var typedArray = new Uint8Array(str.match(/[\da-f]{2}/gi).map(function (h) {
      return parseInt(h, 16)
    }))
    var buffer = typedArray.buffer
    const hash = await crypto.subtle.digest('SHA-256', buffer)
    return Array.prototype.map.call(new Uint8Array(hash), x=>(('00'+x.toString(16)).slice(-2))).join('')
  },
  // sha256: function (hexString) {
  //   var sha = new JsSHA('SHA-256', 'HEX')
  //   sha.update(hexString)
  //   return sha.getHash('HEX')
  // },
  sha256Checksum: async function (payload) {
    let hash = await this.sha256(await this.sha256(payload))
    return hash.substr(0,8)
    // return this.sha256(this.sha256(payload)).substr(0, 8)
  },
  blake256: function (hexString) {
    return new Blake256().update(hexString, 'hex').digest('hex')
  },
  blake256Checksum: function (payload) {
    return this.blake256(this.blake256(payload)).substr(0, 8)
  },
  blake2b: function (hexString, outlen) {
    return new Blake2B(outlen).update(Buffer.from(hexString, 'hex')).digest('hex')
  },
  keccak256: function (hexString) {
    return keccak256(hexString)
  },
  keccak256Checksum: function (payload) {
    return keccak256(payload).toString().substr(0, 8)
  },
  blake2b256: function (hexString) {
    return new Blake2B(32).update(Buffer.from(hexString, 'hex'), 32).digest('hex')
  }
}
