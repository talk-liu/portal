const DataLoader = require('dataloader')

class ComputingPowerConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  fetchComputingPower() {
    return {
      count: 0,
      estimated: 0,
      blocks: []
    }//this.ctx.service.computingPower.get()
  }
}

module.exports = ComputingPowerConnector

