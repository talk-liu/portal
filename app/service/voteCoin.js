
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class VoteCoinService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'voteCoin.js')
  }

  async initClient() {
    const voteCoin = require(await this.loadPath())
    return new voteCoin(util.serviceParams({
      class: 'voteCoin',
      ctx: this.ctx
    }))
  }

  async get() {
    const voteCoinInstance = await this.initClient()
    return voteCoinInstance.get()
  }
}

module.exports = VoteCoinService

