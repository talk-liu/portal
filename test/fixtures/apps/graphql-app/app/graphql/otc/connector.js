
const DataLoader = require('dataloader')

class OtcConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.otc.get()
  }
}

module.exports = OtcConnector

