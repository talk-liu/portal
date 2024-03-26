const DataLoader = require('dataloader')

class OptionMarketConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionMarket.get(params)
    return result 
  }
}

module.exports = OptionMarketConnector
