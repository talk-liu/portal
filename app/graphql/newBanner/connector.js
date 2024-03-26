const DataLoader = require('dataloader')

class newBannerConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get() {
    let { banner, announce } = await this.ctx.helper.renderBanner()
    banner = JSON.parse(banner)
    announce = JSON.parse(announce)
    return { banner, announce }
  }
}

module.exports = newBannerConnector