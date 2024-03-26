const DataLoader = require('dataloader')

class MemberConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  fetchComputingPower() {
    return this.ctx.service.computingPower.get()
  }
}

module.exports = MemberConnector

