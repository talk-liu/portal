const process = require('process')
const env = process.env.EGG_SERVER_ENV || 'local'
const mapiConfig = require('../../../../../../../config/config.' + env + '.js')().mapi
const crypto = require('crypto')
const request = require('request')
const Promise = require('bluebird')

const mapiSignature = function(params) {
  const reqMethod = params.reqMethod
  const reqUrl = params.reqUrl
  const reqParams = params.reqParams
  let paramsKeys = []
  for (const key in reqParams) {
    paramsKeys.push(key)

  }
  paramsKeys = paramsKeys.sort()
  let payload = reqMethod + '|' + reqUrl + '|'
  let temp = ''
  for (let i = 0; i < paramsKeys.length; i++) {
    temp = temp + paramsKeys[i] + '=' + reqParams[paramsKeys[i]]
    if (i < paramsKeys.length - 1) {
      temp = temp + '&'
    }
  }
  payload = payload + temp
  const hmac = crypto.createHmac('sha256', mapiConfig.secret)
  hmac.update(payload)
  const signature = hmac.digest('hex')
  return signature
}

const mapiRequest = function(options) {
  return Promise.promisify(request)(options)
    .then(data => {
      return JSON.parse(data.body).data
    }).catch(() => {
      throw (`MAPI_${options.url}_ERROR`)
    })
}

const getTokenByRefreshToken = function(refreshToken) {
  const params = {
    reqMethod: mapiConfig.urls.token.method,
    reqUrl: mapiConfig.urls.token.url,
    reqParams: {
      refresh_token: refreshToken,
      tonce: new Date().getTime(),
      app_key: mapiConfig.key
    }
  }

  const signature = mapiSignature(params)
  const headers = {
    'Accept-Language': 'zh-CN',
    platform: 'ios'
  }
  const options = {
    url: mapiConfig.baseUrl + params.reqUrl,
    method: 'POST',
    headers,
    form: { tonce: params.reqParams.tonce, app_key: mapiConfig.key, signature, refresh_token: refreshToken }
  }
  return mapiRequest(options)
}

/**
 *
 * @param options {class:String,category:String,jsonParams:JSON}
 */

const mapiReady = async function(options) {
  const params = {}
  let tempParams = null
  params.reqMethod = mapiConfig.urls[options.class][options.category].method
  params.reqUrl = mapiConfig.urls[options.class][options.category].url
  tempParams = mapiConfig.urls[options.class][options.category].params
  params.reqParams = {
    tonce: new Date().getTime(), // todo 注意时区问题
    app_key: mapiConfig.key
  }
  if (tempParams.length > 0) {
    for (let i = 0; i < tempParams.length; i++) {
      params.reqParams[tempParams[i]] = options.jsonParams[tempParams[i]]
    }
  }
  const signature = mapiSignature(params)
  let token = null
  try {
    token = await getTokenByRefreshToken(mapiConfig.refreshToken)
      .then(ret => {
        return ret.token
      }).catch(err => {
        throw new Error(err)
      })
  } catch (err) {
    return null
  }

  const headers = {
    'Accept-Language': 'zh-CN', // todo 应该由前端传过来
    platform: mapiConfig.platform,
    Authorization: token
  }

  let ops = null
  let suffix = null
  let formJson = {}
  switch (params.reqMethod) {
    case 'GET':
      suffix = `?tonce=${params.reqParams.tonce}&app_key=${mapiConfig.key}&signature=${signature}`
      if (tempParams.length > 0) {
        for (let i = 0; i < tempParams.length; i++) {
          suffix = suffix + `&${tempParams[i]}=${params.reqParams[tempParams[i]]}`
        }
      }
      ops = {
        url: mapiConfig.baseUrl + params.reqUrl + suffix,
        method: 'GET',
        headers
      }
      break
    default:
      formJson = params.reqParams
      formJson.signature = signature
      ops = {
        url: mapiConfig.baseUrl + params.reqUrl,
        method: 'POST',
        headers,
        form: formJson
      }
      break
  }
  return ops
}

const base = async function(options) {
  const target = {}
  target.class = options.class
  target.category = options.category
  target.jsonParams = options.jsonParams
  const opt = await mapiReady(target)
  const result = await mapiRequest(opt)
    .then(data => {
      return data
    }).catch(err => {
      throw new Error(err)
    })
  return result
}

module.exports.mapiSignature = mapiSignature
module.exports.getTokenByRefreshToken = getTokenByRefreshToken
module.exports.mapiRequest = mapiRequest
module.exports.mapiReady = mapiReady
module.exports.base = base
