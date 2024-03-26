
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class VoteCountService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'voteCount.js')
  }

  async initClient() {
    const voteCount = require(await this.loadPath())
    return new voteCount(util.serviceParams({
      class: 'voteCount',
      ctx: this.ctx
    }))
  }

  async get(period) {
    const voteCountInstance = await this.initClient()
    return voteCountInstance.get(period)
  }
}

module.exports = VoteCountService

