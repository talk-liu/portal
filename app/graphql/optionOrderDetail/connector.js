const DataLoader = require('dataloader')

class OptionOrderDetailConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.optionOrderDetail.get(params)
    return result 
  }
}

module.exports = OptionOrderDetailConnector
