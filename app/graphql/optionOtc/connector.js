
const DataLoader = require('dataloader')

class OptionOtcConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.optionOtc.get()
  }
}

module.exports = OptionOtcConnector

