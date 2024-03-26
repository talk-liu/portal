
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class AskService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'ask.js')
  }

  async initClient() {
    const ask = require(await this.loadPath())
    return new ask(util.serviceParams({
      class: 'ask',
      ctx: this.ctx
    }))
  }

  async updateAsk({ market, volume, price, ord_type, percent }) {
    const askInstance = await this.initClient()
    return askInstance.update({ market, volume, price, ord_type, percent })
  }
}

module.exports = AskService
