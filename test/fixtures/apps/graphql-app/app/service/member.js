
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')

class MemberService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'member.js')
  }

  async initClient() {
    const member = require(await this.loadPath())
    return new member()
  }

  async get() {
    const memberInstance = await this.initClient()
    return memberInstance.get()
  }
}

module.exports = MemberService
