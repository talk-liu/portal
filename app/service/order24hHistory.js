
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class Order24hHistoryService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'order24hHistory.js')
  }

  async initClient() {
    const order24hHistory = require(await this.loadPath())
    return new order24hHistory(util.serviceParams({
      class: 'order24hHistory',
      ctx: this.ctx
    }))
  }

  async get({ per_page }) {
    const order24hHistoryInstance = await this.initClient()
    return order24hHistoryInstance.get({ per_page })
  }
}

module.exports = Order24hHistoryService
