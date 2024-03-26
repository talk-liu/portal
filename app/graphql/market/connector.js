const DataLoader = require('dataloader')

class MarketConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async getMMarket() {
    const result = {}
    result.list = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'mMarket')
    return result
  }
}

module.exports = MarketConnector

