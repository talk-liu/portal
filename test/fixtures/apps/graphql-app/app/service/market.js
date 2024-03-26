
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')

class MarketService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'market.js')
  }

  async initClient() {
    const market = require(await this.loadPath())
    return new market()
  }

  async get(id) {
    const marketInstance = await this.initClient()
    return marketInstance.get(id)
  }
}

module.exports = MarketService
