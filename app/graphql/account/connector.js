
const DataLoader = require('dataloader')

class AccountConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(market) {
    return this.ctx.service.account.get(market)
  }
}

module.exports = AccountConnector

