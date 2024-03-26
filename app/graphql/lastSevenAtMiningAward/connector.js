const DataLoader = require('dataloader')

class LastSevenAtMiningAwardConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  fetchLastSevenAtMiningAward() {
    return this.ctx.service.lastSevenAtMiningAward.get()
  }
}

module.exports = LastSevenAtMiningAwardConnector

