
const DataLoader = require('dataloader')

class ProxyConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async redirect(params) {
    return this.ctx.service.proxy.redirect(params)
  }
}

module.exports = ProxyConnector

