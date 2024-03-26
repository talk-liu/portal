const DataLoader = require('dataloader')

class OptionTransfersHistoryConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get(params) {
    const result = this.ctx.service.optionTransfersHistory.get(params)
    return  result 
  }
}

module.exports = OptionTransfersHistoryConnector
