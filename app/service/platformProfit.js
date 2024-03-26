
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class PlatformProfitService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'platformProfit.js')
  }

  async initClient() {
    const platformProfit = require(await this.loadPath())
    return new platformProfit(util.serviceParams({
      class: 'platformProfit',
      ctx: this.ctx
    }))
  }

  async get() {
    const platformProfitInstance = await this.initClient()
    return platformProfitInstance.get()
  }
}

module.exports = PlatformProfitService
