
const DataLoader = require('dataloader')

class VoteCountConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(period) {
    return this.ctx.service.voteCount.get(period)
  }
}

module.exports = VoteCountConnector

