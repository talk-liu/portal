const DataLoader = require('dataloader')

class OptionDepthConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionDepth.get(params)
    return  result 
  }
}

module.exports = OptionDepthConnector
