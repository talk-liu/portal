
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class LastSevenAtMiningAwardService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'lastSevenAtMiningAward.js')
  }

  async initClient() {
    const lastSevenAtMiningAward = require(await this.loadPath())
    return new lastSevenAtMiningAward(util.serviceParams({
      class: 'lastSevenAtMiningAward',
      ctx: this.ctx
    }))
  }

  async get() {
    const lastSevenAtMiningAwardInstance = await this.initClient()
    return lastSevenAtMiningAwardInstance.get()
  }
}

module.exports = LastSevenAtMiningAwardService

