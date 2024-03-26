const DataLoader = require('dataloader')

class OptionPriceIndexConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.optionPriceIndex.get(params)
    return { result }
  }
}

module.exports = OptionPriceIndexConnector
