
const DataLoader = require('dataloader')

class IsMinerConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.isMiner.get()
  }
}

module.exports = IsMinerConnector

