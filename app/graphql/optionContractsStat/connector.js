const DataLoader = require('dataloader')

class OptionContractsStatConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionContractsStat.get(params)
    return  result 
  }
}

module.exports = OptionContractsStatConnector
