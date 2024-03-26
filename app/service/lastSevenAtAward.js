
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class LastSevenAtAwardService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'lastSevenAtAward.js')
  }

  async initClient() {
    const lastSevenAtAward = require(await this.loadPath())
    return new lastSevenAtAward(util.serviceParams({
      class: 'lastSevenAtAward',
      ctx: this.ctx
    }))
  }

  async get() {
    const lastSevenAtAwardInstance = await this.initClient()
    return lastSevenAtAwardInstance.get()
  }
}

module.exports = LastSevenAtAwardService

