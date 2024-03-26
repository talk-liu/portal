const DataLoader = require('dataloader')

class OptionTradeConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionTrade.get(params)
    return result 
  }
}

module.exports = OptionTradeConnector
