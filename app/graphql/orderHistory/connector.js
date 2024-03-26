
const DataLoader = require('dataloader')

class OrderHistoryConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get({state,per_page}) {
    return this.ctx.service.orderHistory.get({state,per_page})
  }
}

module.exports = OrderHistoryConnector

