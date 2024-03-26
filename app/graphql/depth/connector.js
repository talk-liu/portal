
const DataLoader = require('dataloader')

class DepthConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get({market}) {
    return this.ctx.service.depth.get({market})
  }
}

module.exports = DepthConnector

