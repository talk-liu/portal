
const DataLoader = require('dataloader')

class Order24hHistoryConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get({per_page}) {
    return this.ctx.service.order24hHistory.get({per_page})
  }
}

module.exports = Order24hHistoryConnector

