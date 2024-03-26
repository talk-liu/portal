
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class OptionOtcService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'optionOtc.js')
  }

  async initClient() {
    const optionOtc = require(await this.loadPath())
    return new optionOtc(util.serviceParams({
      class: 'optionOtc',
      ctx: this.ctx
    }))
  }

  async get() {
    const otcInstance = await this.initClient()
    return otcInstance.get()
  }
}

module.exports = OptionOtcService
