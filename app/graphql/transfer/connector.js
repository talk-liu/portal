const DataLoader = require('dataloader')

class TransferConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  post(params) {
    return this.ctx.service.transfer.post(params)
  }
}

module.exports = TransferConnector
