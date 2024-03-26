
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class FrontedCurrencyService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'frontedCurrency.js')
  }

  async initClient() {
    const frontedCurrency = require(await this.loadPath())
    return new frontedCurrency(util.serviceParams({
      class: 'frontedCurrency',
      ctx: this.ctx
    }))
  }

  async get() {
    const frontedCurrencyInstance = await this.initClient()
    return frontedCurrencyInstance.get()
  }
}

module.exports = FrontedCurrencyService
