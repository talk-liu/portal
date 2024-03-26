
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class MemberService extends Service {
  async verify(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'verify' }, 'member')
    return { result }
  }
  async faceppVerify() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'faceppVerify' }, 'member')
    return { result }
  }

  async captcha() {
    return this.ctx.service.generalRequest.request({}, { method: 'get' }, 'captcha')
  }
  async challenge() {
    return this.ctx.service.generalRequest.request({}, { method: 'get' }, 'challenge')
  }

  document(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'document' }, 'member')
  }

  historyMining(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'historyMining' }, 'member')
  }
  historyProfits(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'historyProfits' }, 'member')
  }

  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'member.js')
  }

  async initClient() {
    const loadpath = await this.loadPath()
    const member = require(loadpath)
    return new member(util.serviceParams({
      class: 'member',
      ctx: this.ctx
    }))
  }

  async get() {
    const memberInstance = await this.initClient()
    return memberInstance.get()
  }
}

module.exports = MemberService
