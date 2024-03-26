
const DataLoader = require('dataloader')

class PlatformProfitConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.platformProfit.get()
  }
}

module.exports = PlatformProfitConnector

