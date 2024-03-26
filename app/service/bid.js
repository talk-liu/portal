
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class BidService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'bid.js')
  }

  async initClient() {
    const bid = require(await this.loadPath())
    return new bid(util.serviceParams({
      class: 'bid',
      ctx: this.ctx
    }))
  }

  async updateBid({ market, volume, price, ord_type, percent }) {
    const bidInstance = await this.initClient()
    return bidInstance.update({ market, volume, price, ord_type, percent })
  }
}

module.exports = BidService
