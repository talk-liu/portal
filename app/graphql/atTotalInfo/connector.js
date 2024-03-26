const DataLoader = require('dataloader')

class AtTotalInfoConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  fetchAtTotalInfo() {
    return this.ctx.service.atTotalInfo.get()
  }
}

module.exports = AtTotalInfoConnector

