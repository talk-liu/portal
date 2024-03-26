
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class OrderHistoryService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'orderHistory.js')
  }

  async initClient() {
    const orderHistory = require(await this.loadPath())
    return new orderHistory(util.serviceParams({
      class: 'orderHistory',
      ctx: this.ctx
    }))
  }

  async get({ state, per_page }) {
    const orderHistoryInstance = await this.initClient()
    return orderHistoryInstance.get({ state, per_page })
  }
}

module.exports = OrderHistoryService
