
const DataLoader = require('dataloader')

class atGameConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async atGameTaskList(params) {
    return this.ctx.service.atGame.atGameTaskList(params)
  }

  async atGameRewardHis(params) {
    return this.ctx.service.atGame.atGameRewardHis(params)
  }
}

module.exports = atGameConnector

