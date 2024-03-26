
const DataLoader = require('dataloader')

class TradeConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get({market, limit}) {
    return this.ctx.service.trade.get({market, limit})
  }
}

module.exports = TradeConnector

