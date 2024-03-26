
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class TradeService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'trade.js')
  }

  async initClient() {
    const trade = require(await this.loadPath())
    return new trade(util.serviceParams({
      class: 'trade',
      ctx: this.ctx
    }))
  }

  async get({ market, limit }) {
    const tradeInstance = await this.initClient()
    return tradeInstance.get({ market, limit })
  }
}

module.exports = TradeService
