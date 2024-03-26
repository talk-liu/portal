
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')

class KlineService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'kline.js')
  }

  async initClient() {
    const kline = require(await this.loadPath())
    return new kline({
      lang: this.ctx.getLang(),
      redis: this.ctx.app.redis,
      memberId: this.ctx.memberId,
      sessionId: this.ctx.sessionId
    })
  }

  async get(params) {
    const klineInstance = await this.initClient()
    return klineInstance.get(params)
  }
}

module.exports = KlineService
