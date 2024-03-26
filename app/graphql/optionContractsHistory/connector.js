const DataLoader = require('dataloader')

class OptionContractsHistoryConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.optionContractsHistory.get(params)
    return result 
  }
}

module.exports = OptionContractsHistoryConnector
