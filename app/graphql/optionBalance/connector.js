const DataLoader = require('dataloader')

class OptionBalanceConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionBalance')
    return result 
  }
}

module.exports = OptionBalanceConnector
