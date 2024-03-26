
const Service = require('egg').Service
const _ = require('lodash')

class ForgetService extends Service {

  async forgetPassword(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'forgetPassword' }, 'forget')
    return { result }
  }

  async forgetPasswordCode(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'forgetPasswordCode' }, 'forget')
    return { result }
  }

  async forgetPsw(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'forgetPsw' }, 'forget')
    return { result }
  }

  async resetForgetPassword(params) {
    let result
    try {
      result = await this.ctx.service.generalRequest.request(params, { method: 'resetForgetPassword' }, 'forget')
      const paramsJson = {}
      const ret = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
      if (!_.isUndefined(ret.session_id)) {
        paramsJson.session_id = ret.session_id
        this.ctx.cookies.set(this.ctx.app.config.sessionKey, ret.session_id, { domain: this.ctx.app.config.exchangeFrontedSpecialCfg.domain })
      } else {
        paramsJson.session_id = this.ctx.sessionId
        this.ctx.logger.error('mapi session interface in resetForgetPassword: ', ret)
      }
      paramsJson.path = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl + '/'
      await this.ctx.service.generalRequest.request(paramsJson, { method: 'update' }, 'redirect_path')
      return { result }
    } catch (err) {
      // this.ctx.logger.error('ForgetService resetForgetPassword redirect_path : ', err)
      throw new Error(err)
    }
  }

}

module.exports = ForgetService
