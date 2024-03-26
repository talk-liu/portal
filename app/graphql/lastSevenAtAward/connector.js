const DataLoader = require('dataloader')

class LastSevenAtAwardConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  fetchLastSevenAtAward() {
    return this.ctx.service.lastSevenAtAward.get()
  }
}

module.exports = LastSevenAtAwardConnector

