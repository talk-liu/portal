
const DataLoader = require('dataloader')

class OptionOrderPermissonConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get() {
    const result = await this.ctx.helper.whiteListCheck()
    return { pass: result }
  }
}

module.exports = OptionOrderPermissonConnector

