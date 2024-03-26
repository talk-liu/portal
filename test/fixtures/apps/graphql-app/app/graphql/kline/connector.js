
const DataLoader = require('dataloader')

class KlineConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    return this.ctx.service.kline.get(params)
  }
}

module.exports = KlineConnector

