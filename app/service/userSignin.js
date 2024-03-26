
const Service = require('egg').Service
const _ = require('lodash')

class UserSigninService extends Service {
  async signin(params) {
    params.session_id = this.ctx.sessionId
    const result = await this.ctx.service.generalRequest.request(params, { method: 'signin' }, 'userSignin')
    let redirectPath = await this.ctx.app.redis.get('default').get(`s:${params.session_id}`)
    if (!redirectPath) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = JSON.parse(redirectPath)
    if (_.isUndefined(redirectPath.redirect_to_path)) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = redirectPath.redirect_to_path
    result.redirect_to = redirectPath
    return result
  }

  async signup(params) {
    const { ctx } = this
    const ret = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
    let afterSessionId,
      target
    if (!_.isUndefined(ret.session_id)) {
      afterSessionId = ret.session_id
      ctx.cookies.set(ctx.app.config.sessionKey, afterSessionId, { domain: ctx.app.config.exchangeFrontedSpecialCfg.domain })
    }
    if (!afterSessionId) {
      target = ctx.sessionId
    } else {
      target = afterSessionId
    }
    params.session_id = target

    const result = await this.ctx.service.generalRequest.request(params, { method: 'signup' }, 'userSignin')

    let redirectPath = await this.ctx.app.redis.get('default').get(`s:${params.session_id}`)
    if (!redirectPath) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = JSON.parse(redirectPath)

    if (_.isUndefined(redirectPath.redirect_to_path)) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = redirectPath.redirect_to_path
    result.redirect_to = redirectPath
    return result
  }

  async twoFrontendFactor(params) {
    params.session_id = this.ctx.sessionId
    return this.ctx.service.generalRequest.request(params, { method: 'twoFrontendFactor' }, 'userSignin')
  }

  async authTwoFactor(params) {
    params.session_id = this.ctx.sessionId
    const result = await this.ctx.service.generalRequest.request(params, { method: 'authTwoFactor' }, 'userSignin')
    if (!_.isUndefined(result.refresh_token)) {
      delete result.refresh_token
    }
    if (!_.isUndefined(result.token)) {
      delete result.token
    }

    let redirectPath = await this.ctx.app.redis.get('default').get(`s:${params.session_id}`)
    if (!redirectPath) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = JSON.parse(redirectPath)
    if (_.isUndefined(redirectPath.redirect_to_path)) {
      result.redirect_to = this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
      return result
    }
    redirectPath = redirectPath.redirect_to_path
    result.redirect_to = redirectPath
    return result
  }

  async signout() {
    const { ctx } = this
    const params = {}
    params.session_id = ctx.sessionId
    const ret = await ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
    if (!_.isUndefined(ret.session_id)) {
      ctx.cookies.set(ctx.app.config.sessionKey, ret.session_id, { domain: ctx.app.config.exchangeFrontedSpecialCfg.domain })
    } else {
      ctx.logger.error('mapi session interface in signout: ', ret)
    }
    return this.ctx.service.generalRequest.request(params, { method: 'signout' }, 'userSigninWithAcl')
  }

  async activationEmail(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'activationEmail' }, 'userSigninWithAcl')
  }

  async activate(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'activate' }, 'userSigninWithAcl')
  }

  async session() {
    return this.ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
  }

}

module.exports = UserSigninService
