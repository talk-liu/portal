const DataLoader = require('dataloader')

class transifexConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get() {
    const transifex = await this.ctx.helper.renderTX()
    return { transifex }
  }
}

module.exports = transifexConnector