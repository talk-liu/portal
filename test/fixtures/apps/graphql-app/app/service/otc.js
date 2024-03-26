
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')

class OtcService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'otc.js')
  }

  async initClient() {
    const otc = require(await this.loadPath())
    return new otc({
      lang: this.ctx.getLang(),
      redis: this.ctx.app.redis,
      memberId: this.ctx.memberId,
      sessionId: this.ctx.sessionId
    })
  }

  async get() {
    const otcInstance = await this.initClient()
    return otcInstance.get()
  }
}

module.exports = OtcService
