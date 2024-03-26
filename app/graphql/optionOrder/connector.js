const DataLoader = require('dataloader')

class OptionCancelOrderConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }
  get(params) {
    return this.ctx.service.optionOrder.get(params)
  }
  clear(params) {
    return this.ctx.service.optionOrder.clear(params)
  }
  cancel(params) {
    return this.ctx.service.optionOrder.cancel(params)
  }
  create(params) {
    return this.ctx.service.optionOrder.create(params)
  }
}

module.exports = OptionCancelOrderConnector
