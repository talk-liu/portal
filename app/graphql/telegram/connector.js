
const DataLoader = require('dataloader')

class TelegramConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async proxyAuth(params) {
    return this.ctx.service.telegram.proxyAuth(params)
  }
}

module.exports = TelegramConnector

