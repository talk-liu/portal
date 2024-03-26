
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class PendingKLineService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'pendingKLine.js')
  }

  async initClient() {
    const pendingKLine = require(await this.loadPath())
    return new pendingKLine(util.serviceParams({
      class: 'pendingKLine',
      ctx: this.ctx
    }))
  }

  async get({ market, limit, period, _t, trade_id }) {
    const pendingKLineInstance = await this.initClient()
    return pendingKLineInstance.get({ market, limit, period, _t, trade_id })
  }
}

module.exports = PendingKLineService
