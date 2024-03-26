
const DataLoader = require('dataloader')

class VoteCoinConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.voteCoin.get()
  }
}

module.exports = VoteCoinConnector

