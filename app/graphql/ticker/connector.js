
const DataLoader = require('dataloader')

class TickerConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.ticker.get()
  }
  getOptionTicker(params){
    const result = this.ctx.service.optionMarket.getOptionTicker(params)
    return result
  }
}

module.exports = TickerConnector

