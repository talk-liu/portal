
const DataLoader = require('dataloader')

class OrderConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  postBid({market,volume,price,ord_type,percent}) {
    return this.ctx.service.generalRequest.request({market,volume,price,ord_type,percent}, { method: 'update' }, 'bid')
  }

  postAsk({market,volume,price,ord_type,percent}) {
    return this.ctx.service.generalRequest.request({market,volume,price,ord_type,percent}, { method: 'update' }, 'ask')
  }

  deleteOne({id}) {
    return this.ctx.service.generalRequest.request({id}, { method: 'delete' }, 'cancelOrder')
  }

  deleteAll({side}) {
    return this.ctx.service.generalRequest.request({side}, { method: 'delete' }, 'clearOrder')
  }

  getOrder(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'order')
  }
}

module.exports = OrderConnector

