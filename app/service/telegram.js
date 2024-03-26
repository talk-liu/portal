
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class TelegramService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'telegram.js')
  }

  async initClient() {
    const telegram = require(await this.loadPath())
    return new telegram(util.serviceParams({
      class: 'proxyAuth',
      ctx: this.ctx
    }))
  }

  async proxyAuth(params) {
    const telegramInstance = await this.initClient()
    return telegramInstance.proxyAuth(params)
  }
}

module.exports = TelegramService

