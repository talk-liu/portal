const DataLoader = require('dataloader')

class OptionHistoryTradeConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.optionHistoryTrade.get(params)
    return  result
  }

  async historyTrade(params) {
    return await this.ctx.service.optionHistoryTrade.historyTrade(params)
  }
}

module.exports = OptionHistoryTradeConnector
