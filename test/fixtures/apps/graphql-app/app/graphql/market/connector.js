const DataLoader = require('dataloader')

class MarketConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(id) {
    return this.ctx.service.market.get(id)
  }
}

module.exports = MarketConnector

