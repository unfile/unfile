const BTCValidator = require('./bitcoin_validator')
const XMRValidator = require('./monero_validator')

// defines P2PKH and P2SH address types for standard (prod) and testnet networks
const CURRENCIES = [
  {
    name: 'Bitcoin',
    symbol: 'btc',
    addressTypes: { prod: ['00', '05'], testnet: ['6f', 'c4'] },
    validator: BTCValidator,
  },
  {
    name: 'Monero',
    symbol: 'xmr',
    addressTypes: { prod: ['18', '42'], testnet: ['53', '63'] },
    iAddressTypes: { prod: ['19'], testnet: ['54'] },
    validator: XMRValidator,
  }
]

module.exports = {
  getByNameOrSymbol: function (currencyNameOrSymbol) {
    var nameOrSymbol = currencyNameOrSymbol.replace(' ', '').toLowerCase() // Remove spaces and make lowercase
    return CURRENCIES.find(function (currency) {
      return (
        currency.name.replace(' ', '').toLowerCase() === nameOrSymbol ||
        currency.symbol.replace(' ', '').toLowerCase() === nameOrSymbol
      )
    })
  },
  CURRENCIES,
}
