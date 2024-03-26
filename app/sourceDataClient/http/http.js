
const request = require('request')
const Promise = require('bluebird')
const util = require('./util')
const appUtil = require('../../util/index')
const _ = require('lodash')
const moment = require('moment')
const qs = require('qs')
const fs = require('fs')

const paramsFunc = function(options) {
  const params = {}
  let tempParams
  switch (options.whichRouter) {
    case 'huobi':
      params.reqMethod = options.ctx.app.config.huobiCfg.urls[options.class][options.category].method
      params.reqUrl = options.ctx.app.config.huobiCfg.urls[options.class][options.category].url
      tempParams = options.ctx.app.config.huobiCfg.urls[options.class][options.category].params
      break
    case 'exchange':
      params.reqMethod = options.ctx.app.config.exchangeFrontedCommonCfg.urls[options.class][options.category].method
      params.reqUrl = options.ctx.app.config.exchangeFrontedCommonCfg.urls[options.class][options.category].url
      tempParams = options.ctx.app.config.exchangeFrontedCommonCfg.urls[options.class][options.category].params
      break
    case 'napi':
      params.reqMethod = options.ctx.app.config.napiCommonCfg.urls[options.class][options.category].method
      params.reqUrl = options.ctx.app.config.napiCommonCfg.urls[options.class][options.category].url
      tempParams = options.ctx.app.config.napiCommonCfg.urls[options.class][options.category].params
      break
    case 'ieo':
      params.reqMethod = options.ctx.app.config.ieoCfg.urls[options.class][options.category].method
      params.reqUrl = options.ctx.app.config.ieoCfg.urls[options.class][options.category].url
      tempParams = options.ctx.app.config.ieoCfg.urls[options.class][options.category].params
      break
    default:
      params.reqMethod = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].method
      params.reqUrl = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].url
      tempParams = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].params
      params.reqParams = {
        tonce: moment().unix(), // todo 注意时区问题
        app_key: options.ctx.app.config.mapiSpecialCfg.key
      }
      break
  }

  if (!params.reqParams) {
    params.reqParams = {}
  }

  if (tempParams.length > 0) {
    for (let i = 0; i < tempParams.length; i++) {
      if (!_.isUndefined(options.jsonParams[tempParams[i]])) {
        params.reqParams[tempParams[i]] = options.jsonParams[tempParams[i]]
      }
    }
  }
  return params
}

const signatureFunc = function(options) {
  const params = paramsFunc(options)
  const opt = {}
  opt.params = params
  opt.ctx = options.ctx
  opt.className = options.class
  opt.category = options.category
  return util.mapiSignature(opt)
}

const headersFunc = async function(options) {
  let ret = null
  const headers = {
    'Accept-Language': options.lang || 'zh-CN',
    platform: options.ctx.app.config.mapiCommonCfg.platform,
    'X-Forwarded-For': options.ctx.ip,
    'User-Agent': options.ctx.userAgent
  }
  if (appUtil.ifNeedAcl({
    class: options.class,
    ctx: options.ctx
  }) && options.class !== 'refreshToken') {
    try {
      const refreshToken = await util.getRefreshTokenFromMapi(options)
      options.ctx.helper.alog(`${options.class} getRefreshTokenFromMapi refreshToken is : ${JSON.stringify({ refreshToken, memberId: options.memberId })}`)
      ret = await util.getTokenByRefreshToken({ redis: options.redis, memberId: options.memberId, refreshToken, lang: options.lang, ctx: options.ctx, className: options.class, category: options.category })
      options.ctx.helper.alog(`${options.class} getTokenByRefreshToken ret is : ${JSON.stringify({ ret, memberId: options.memberId })}`)
      headers.Authorization = ret.token
      return headers
    } catch (err) {
      options.ctx.logger.error(err.message)
      throw err
    }
  }
  return headers
}

const opt = function(options) {
  const params = options.params
  const extendParams = {}
  let ops = null
  let suffix = ''
  let signature,
    headers,
    isFormData,
    excludeSignature
  let formJson = {}
  switch (options.whichRouter) {
    case 'huobi':
      switch (params.reqMethod) {
        case 'GET':
          _.extend(extendParams, params.reqParams)
          suffix = `?${qs.stringify(extendParams)}`
          ops = {
            url: options.ctx.app.config.huobiCfg.baseUrl + params.reqUrl + suffix,
            method: 'GET',
            dataType: 'json'
          }
          break
        case 'POST':
          break
        default:
          break
      }
      break
    case 'ieo':
      switch (params.reqMethod) {
        case 'POST':
          _.extend(extendParams, params.reqParams)
          suffix = `?${qs.stringify(extendParams)}`
          ops = {
            url: options.ctx.app.config.ieoSpecialConfig.baseUrl + params.reqUrl + suffix,
            method: 'POST',
            dataType: 'json',
            body: JSON.stringify(params.reqParams)
          }
          break
        case 'GET':
          break
        default:
          break
      }
      break
    case 'exchange':
      switch (params.reqMethod) {
        case 'GET':
          _.extend(extendParams, params.reqParams)
          suffix = `?${qs.stringify(extendParams)}`
          ops = {
            url: options.ctx.app.config.exchangeFrontedSpecialCfg.apiBaseUrl + params.reqUrl + suffix,
            method: 'GET',
            dataType: 'json'
          }
          if (options.ctx.app.config.exchangeFrontedSpecialCfg.baseAuth) {
            ops.auth = options.ctx.app.config.exchangeFrontedSpecialCfg.baseAuth
          }
          break
        case 'POST':
          break
        default:
          break
      }
      break
    case 'napi':
      switch (params.reqMethod) {
        case 'GET':
          _.extend(extendParams, params.reqParams)
          suffix = `?${qs.stringify(extendParams)}`
          headers = {}
          headers.origin = options.ctx.app.config.napiSpecialCfg.originDomain
          ops = {
            url: options.ctx.app.config.napiSpecialCfg.baseUrl + params.reqUrl + suffix,
            method: 'GET',
            dataType: 'json',
            headers
          }
          break
        case 'POST':
          formJson = params.reqParams
          headers = {}
          headers.origin = options.ctx.app.config.napiSpecialCfg.originDomain
          ops = {
            url: options.ctx.app.config.napiSpecialCfg.baseUrl + params.reqUrl,
            method: 'POST',
            headers,
            form: formJson
          }
          break
        default:
          break
      }
      break
    default:
      signature = options.signature
      headers = options.headers
      switch (params.reqMethod) {
        case 'GET':
          _.extend(extendParams, params.reqParams, {
            app_key: options.ctx.app.config.mapiSpecialCfg.key,
            signature
          })
          suffix = `?${qs.stringify(extendParams)}`
          ops = {
            url: options.ctx.app.config.mapiSpecialCfg.baseUrl + params.reqUrl + suffix,
            method: 'GET',
            headers
          }
          break
        default:
          formJson = params.reqParams
          formJson.signature = signature
          ops = {
            url: options.ctx.app.config.mapiSpecialCfg.baseUrl + params.reqUrl,
            method: 'POST',
            headers
          }
          isFormData = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].isFormData
          excludeSignature = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].excludeSignature
          if (!_.isUndefined(isFormData) && isFormData) {
            for (let i = 0; i < excludeSignature.length; i++) {
              formJson[excludeSignature[i]] = fs.createReadStream(formJson[excludeSignature[i]].filepath)
            }
            ops.formData = formJson
          } else {
            ops.form = formJson
          }

          break
      }
      break
  }
  ops.url = options.ctx.helper.removeNoExistsParams(ops.url, options.jsonParams)
  ops.url = options.ctx.helper.templateUrl(ops.url, options.jsonParams)
  // ops = _.extend(options.ctx.app.requestModuleConfig, ops)
  return ops
}

const apiReady = async function(options) {
  const params = paramsFunc(options)
  let tempParams,
    signature,
    headers
  switch (options.whichRouter) {
    case 'huobi':
      tempParams = options.ctx.app.config.huobiCfg.urls[options.class][options.category].params
      break
    case 'exchange':
      tempParams = options.ctx.app.config.exchangeFrontedCommonCfg.urls[options.class][options.category].params
      break
    case 'napi':
      tempParams = options.ctx.app.config.napiCommonCfg.urls[options.class][options.category].params
      break
    case 'ieo':
      tempParams = options.ctx.app.config.ieoCfg.urls[options.class][options.category].params
      break
    default:
      tempParams = options.ctx.app.config.mapiCommonCfg.urls[options.class][options.category].params
      signature = signatureFunc(options)
      headers = await headersFunc(options)
      options.signature = signature
      options.headers = headers
      break
  }
  options.tempParams = tempParams
  options.params = params
  return opt(options)
}

const apiRequest = function(options) {
  return Promise.promisify(request)(options)
    .then(data => {
      let result = null
      try {
        const json = JSON.parse(data.body)
        result = json && !_.isUndefined(json.data) ? json.data : json
      } catch (err) {
        console.log('apiRequest error', JSON.stringify(data), data.statusCode, options.url, data.body, err.message)// eslint-disable-line
        throw new Error(`apiRequest error ${data.statusCode} ${data.body} ${err.message}`)
      }
      return result
    }).catch(err => {
      console.error('apiRequest catch error', options.url, err.message, err)// eslint-disable-line
      throw err
    })
}

module.exports.apiRequest = apiRequest
module.exports.apiReady = apiReady
