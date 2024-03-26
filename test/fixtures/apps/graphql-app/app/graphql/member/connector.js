
const DataLoader = require('dataloader')

class MemberConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.member.get()
  }
}

module.exports = MemberConnector

