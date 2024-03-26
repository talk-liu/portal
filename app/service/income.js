
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class IncomeService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'income.js')
  }

  async initClient() {
    const income = require(await this.loadPath())
    return new income(util.serviceParams({
      class: 'income',
      ctx: this.ctx
    }))
  }

  async get() {
    const incomeInstance = await this.initClient()
    return incomeInstance.get()
  }
}

module.exports = IncomeService
