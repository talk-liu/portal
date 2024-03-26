
const DataLoader = require('dataloader')

class ieoConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async submitOrder(params) {
    const result =  this.ctx.service.ieo.submitOrder(params)
    return result
  }
  async ieoInfo(params) {
    return this.ctx.service.ieo.ieoInfo(params)
  }

  async orderList(params) {
    return this.ctx.service.ieo.orderList(params)
  }
}

module.exports = ieoConnector

