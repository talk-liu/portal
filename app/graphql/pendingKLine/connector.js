
const DataLoader = require('dataloader')

class PendingKLineConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get({market,limit,period,_t,trade_id}) {
    return this.ctx.service.pendingKLine.get({market,limit,period,_t,trade_id})
  }
}

module.exports = PendingKLineConnector

