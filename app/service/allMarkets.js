
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class AllMarketsService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'allMarkets.js')
  }

  async initClient() {
    const allMarkets = require(await this.loadPath())
    try {
      return new allMarkets(util.serviceParams({
        class: 'allMarkets',
        ctx: this.ctx
      }))
    } catch (e) {
      this.ctx.helper.alog('allMarkets error', JSON.stringify(e))
    }
  }

  async get() {
    const instance = await this.initClient()
    return instance.get()
  }
}

module.exports = AllMarketsService

