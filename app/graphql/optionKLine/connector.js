const DataLoader = require('dataloader')

class OptionKLineConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  optionKLineByCodes(params) {
    const result = this.ctx.service.optionKLine.getByCodes(params)
    return { result }
  }
  optionPenddingKLine(params) {
    const result = this.ctx.service.optionKLine.getPendding(params)
    return result 
  }
  optionKLineByCode(params) {
    const result = this.ctx.service.optionKLine.getByCode(params)
    return { result }
  }
}

module.exports = OptionKLineConnector
