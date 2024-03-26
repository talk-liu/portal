
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class KlineService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'kline.js')
  }

  async initClient() {
    const kline = require(await this.loadPath())
    return new kline(util.serviceParams({
      class: 'kline',
      ctx: this.ctx
    }))
  }

  async get(params) {
    const klineInstance = await this.initClient()
    return klineInstance.get(params)
  }
}

module.exports = KlineService
