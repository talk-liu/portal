
const DataLoader = require('dataloader')

class VoteCoinHistoryConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.voteCoinHistory.get()
  }
}

module.exports = VoteCoinHistoryConnector

