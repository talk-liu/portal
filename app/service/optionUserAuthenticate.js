
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class OptionUserAuthenticateService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'optionUserAuthenticate.js')
  }

  async initClient() {
    const optionUserAuthenticate = require(await this.loadPath())
    return new optionUserAuthenticate(util.serviceParams({
      class: 'optionUserAuthenticate',
      ctx: this.ctx
    }))
  }

  async getAgree() {
    if (this.ctx.currentMemberId) {
      const optionUserAuthenticateInstance = await this.initClient()
      return optionUserAuthenticateInstance.get()
    }
    return { result: false }

  }

  async setAgree() {
    const optionUserAuthenticateInstance = await this.initClient()
    return optionUserAuthenticateInstance.update()
  }
}

module.exports = OptionUserAuthenticateService
