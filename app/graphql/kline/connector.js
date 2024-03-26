
const DataLoader = require('dataloader')
const _ = require('lodash')

class KlineConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    return this.ctx.service.kline.get(params)
  }

  async getSingleKLine(params) {
    const result = {}
    result.k = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'singleKLine')
    if(!_.isArray(result.k)) {
      result.k = []
    }
    return result
  }
}

module.exports = KlineConnector

