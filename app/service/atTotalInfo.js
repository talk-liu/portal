
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class AtTotalInfoService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'atTotalInfo.js')
  }

  async initClient() {
    const atTotalInfo = require(await this.loadPath())
    return new atTotalInfo(util.serviceParams({
      class: 'atTotalInfo',
      ctx: this.ctx
    }))
  }

  async get() {
    const atTotalInfoInstance = await this.initClient()
    return atTotalInfoInstance.get()
  }
}

module.exports = AtTotalInfoService

