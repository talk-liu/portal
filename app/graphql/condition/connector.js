const DataLoader = require('dataloader')

class ConditionConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  cancel(params) {
    return this.ctx.service.condition.cancel(params)
  }

  create(params) {
    return this.ctx.service.condition.create(params)
  }

  getCurrent(params) {
    return this.ctx.service.condition.getCurrent(params)
  }

  getHistory(params) {
    return this.ctx.service.condition.getHistory(params)
  }

  clear() {
    return this.ctx.service.condition.clear()
  }
}

module.exports = ConditionConnector

