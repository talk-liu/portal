const DataLoader = require('dataloader')

class IncomeConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.income.get()
  }
}

module.exports = IncomeConnector

