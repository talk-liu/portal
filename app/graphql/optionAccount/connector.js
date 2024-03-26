const DataLoader = require('dataloader')

class OptionAccountConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionAccount.get(params)
    return result 
  }
}

module.exports = OptionAccountConnector
