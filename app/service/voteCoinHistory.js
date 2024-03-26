
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class VoteCoinHistoryService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'voteCoinHistory.js')
  }

  async initClient() {
    const voteCoinHistory = require(await this.loadPath())
    return new voteCoinHistory(util.serviceParams({
      class: 'voteCoinHistory',
      ctx: this.ctx
    }))
  }

  async get() {
    const voteCoinHistoryInstance = await this.initClient()
    return voteCoinHistoryInstance.get()
  }
}

module.exports = VoteCoinHistoryService

