
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class AccountService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'account.js')
  }

  async initClient() {
    const account = require(await this.loadPath())
    return new account(util.serviceParams({
      class: 'account',
      ctx: this.ctx
    }))
  }

  async get(market) {
    const accountInstance = await this.initClient()
    return accountInstance.get(market)
  }
}

module.exports = AccountService
