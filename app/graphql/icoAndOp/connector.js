
const DataLoader = require('dataloader')

class IcoConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.icoAndOp.get()
  }
}

module.exports = IcoConnector

