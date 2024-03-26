
const CURRENT_MEMBER_ID = Symbol('Context#currentMemberId')
const MAPI_ERROR_CODE = Symbol('Context#mapiErrorCode')
const ORIGIN_ERR = Symbol('Context#originErr')
const TRADINGVIEW = Symbol('Context#tradingView')
const _ = require('lodash')
const Context = {
  // 临时保存此次mapi的错误码 用于返回给前端使用 因为目前egg-graphq版本 不支持传参formatError
  set mapiErrCode(code) {
    this[MAPI_ERROR_CODE] = code
  },
  get sessionKey() {
    return this.app.config.sessionKey
  },
  get mapiErrCode() {
    return this[MAPI_ERROR_CODE]
  },
  // mapi中原始错误格式
  get originErr() {
    return this[ORIGIN_ERR]
  },
  set originErr(err) {
    this[ORIGIN_ERR] = err
  },
  get sessionId() {
    const result = this.cookies.get(this.sessionKey, { signed: false })
    // this.logger.debug(
    //   'sessionId from cookies is : ',
    //   result
    // )

    return result || this.helper.envSessionId()
  },
  async getCurrentMemberId() {
    // this.logger.debug(
    //   'this.sessionId is : ',
    //   this.sessionId
    // )
    if (!this.sessionId) {
      this.helper.alog(
        'getCurrentMemberId not found sessionId',
        this.sessionId
      )
      return
    }

    const sessionStr = await this.app.redis.get('default').get('s:' + this.sessionId)

    if (!sessionStr) {
      this.helper.alog(
        'getCurrentMemberId sessionId',
        this.sessionId,
        sessionStr
      )
      return
    }

    let sessionObj
    try {
      sessionObj = JSON.parse(sessionStr)
    } catch (e) {
      e.message = `ctx.currentMemberId JSON parse sessionStr failed: ${
        e.message
      }, ${sessionStr}`
      this.logger.error(e.message)
      return
    }

    this[CURRENT_MEMBER_ID] = sessionObj.member_id
  },

  get currentMemberId() {
    return this[CURRENT_MEMBER_ID] || this.helper.envMemberId()
  },

  getLang() {
    // console.log(this.lang)
    // const lang = this.cookies.get('lang', { signed: false })
    return this.lang || 'en'
  },

  unauthorized() {
    const result = {
      success: false,
      isAuth: false,
      message: 'required auth'
    }
    let body = this.request.body
    let isGraphql = false
    if (_.isString(body)) {
      try {
        body = JSON.parse(body)
      } catch (e) {
        //
      }
    }
    // 如果请求体中包含这三个变量则表示是graphql请求
    if (body && body.operationName && body.query && body.variables) {
      isGraphql = true
    }
    // 如果不是graphql
    if (!isGraphql) {
      this.body = result
    } else {
      // 否则使用graphql的错误格式返回
      this.body = {
        errors: [ result ],
        data: {}
      }
    }
  },

  get userAgent() {
    let ret
    try {
      ret = this.request.header['user-agent']
    } catch (err) {
      this.logger.error('ctx userAgent existed error : ', err)
      ret = ''
    }
    return ret
  },

  get ip() {
    let ip
    let ips = this.ips ? this.ips : this.ip
    if (!ips) {
      ips = []
    }
    if (ips.indexOf(',') < 0) {
      ip = ips
    } else {
      const tempIps = ips.split(',')
      ip = tempIps[0]
    }
    return ip
  },

  mountTradingView({ clientId, userId, template }) {
    this[TRADINGVIEW] = { clientId, userId, template }
  },

  get tradingView() {
    return this[TRADINGVIEW]
  }
}
module.exports = Context
