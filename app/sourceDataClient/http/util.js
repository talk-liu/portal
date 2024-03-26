
const crypto = require('crypto')
const _ = require('lodash')
const http = require('./http')
const moment = require('moment')

const mapiSignature = function({ params, ctx, className, category }) {
  const reqMethod = params.reqMethod
  const reqUrl = params.reqUrl
  const reqParams = params.reqParams
  let paramsKeys = []
  let count
  const excludeParams = ctx.app.config.mapiCommonCfg.urls[className][category].excludeSignature
  for (const key in reqParams) {
    count = 0
    if (!_.isUndefined(excludeParams)) {
      for (let i = 0; i < excludeParams.length; i++) {
        if (excludeParams[i] === key) {
          break
        }
        count++
      }
      if (++count > excludeParams.length) {
        paramsKeys.push(key)
      }
    } else {
      paramsKeys.push(key)
    }
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
  if (className === 'member') {
    ctx.helper.alog(`checkMemberIssue mapiSignature payload : ${payload}`)
  }
  const hmac = crypto.createHmac('sha256', ctx.app.config.mapiSpecialCfg.secret)
  hmac.update(payload)
  const signature = hmac.digest('hex')
  if (className === 'member') {
    ctx.helper.alog(`checkMemberIssue mapiSignature hmac : ${signature}`)
  }

  return signature
}

const getRefreshTokenFromRedis = async function(options) {
  const key = 'portal:refreshToken:' + options.memberId
  return null
  const refreshToken = await options.redis.get('portal').get(key)
  if (refreshToken && refreshToken.indexOf('error') < 0) {
    return refreshToken
  }
  return null
}

const getTokenFromRedis = async function(options) {
  const key = 'portal:token:' + options.memberId
  const token = await options.redis.get('portal').get(key)
  if (token && token.indexOf('error') < 0) {
    return token
  }
  return null
}

const base = async function(options) {
  const opt = await http.apiReady(options)
  options.ctx.helper.alog(`checkMemberIssue in apiReady is : ${JSON.stringify(opt)}`)

  const result = await http.apiRequest(opt)
    .then(data => {
      return data
    }).catch(err => {
      throw err
    })
  options.ctx.helper.alog(`checkMemberIssue in apiRequest is : ${JSON.stringify(result)}`)
  return result
}

const getRefreshTokenFromMapi = async function(options) {
  let result = await getRefreshTokenFromRedis(options)
  options.ctx.helper.alog('checkMemberIssue refreshToken', JSON.stringify({
    result,
    memberId: options.memberId
  }))

  if (!result) {
    const opt = {}
    opt.category = 'get'
    opt.jsonParams = {
      member_id: options.memberId,
      session_id: options.sessionId
    }
    opt.class = 'refreshToken'
    opt.lang = options.lang
    opt.ctx = options.ctx
    result = await base(opt)
    options.ctx.helper.alog('checkMemberIssue refreshToken', JSON.stringify(result))
    if (!result.error) {
      const key = 'portal:refreshToken:' + options.memberId
      await options.redis.get('portal').set(key, result, 'EX', 5 * 24 * 60 * 60)
    }
  }
  return result
}

const getTokenByRefreshToken = async function(options) {
  const params = {
    reqMethod: options.ctx.app.config.mapiCommonCfg.urls.token.method,
    reqUrl: options.ctx.app.config.mapiCommonCfg.urls.token.url,
    reqParams: {
      refresh_token: options.refreshToken,
      tonce: moment().unix(),
      app_key: options.ctx.app.config.mapiSpecialCfg.key
    }
  }

  const signature = mapiSignature({ params, ctx: options.ctx, className: options.className, category: options.category })
  const headers = {
    'Accept-Language': options.lang || 'zh-CN',
    platform: options.ctx.app.config.mapiCommonCfg.platform
  }
  const opt = {
    url: options.ctx.app.config.mapiSpecialCfg.baseUrl + params.reqUrl,
    method: 'POST',
    headers,
    form: { tonce: params.reqParams.tonce, app_key: options.ctx.app.config.mapiSpecialCfg.key, signature, refresh_token: options.refreshToken }
  }
  options.ctx.helper.alog('checkMemberIssue token opt', JSON.stringify({
    opt
  }))
  let result
  result = await getTokenFromRedis(options)
  if (!result) {
    result = await http.apiRequest(opt)
    options.ctx.helper.alog('checkMemberIssue token', JSON.stringify({
      result
    }))

    if (_.isPlainObject(result)) {
      if (!result.error && !_.isUndefined(result.token)) {
        const key = 'portal:token:' + options.memberId
        await options.redis.get('portal').set(key, JSON.stringify(result), 'EX', 60 * 3)
        return result
      }
      options.ctx.helper.alog('checkMemberIssue', JSON.stringify(result))
      throw new Error('getTokenByRefreshToken-error')
    } else {
      options.ctx.helper.alog('checkMemberIssue', JSON.stringify(result))
      throw new Error('getTokenByRefreshToken parse error')
    }
  }
  result = JSON.parse(result)
  return result
}

const atRelease = function({ interval }) {
  const target = moment('2018-11-06').utcOffset(480)
  const targetToday = _.cloneDeep(target).startOf('day')
  const targetNow = _.cloneDeep(targetToday).add(12, 'h')
  const dayArray = []
  let divisor
  for (let i = 0; i < 4; i++) {
    dayArray.push(_.cloneDeep(targetNow).add(i * 120, 'd'))
  }
  for (let j = 0; j < 3; j++) {
    if (interval >= dayArray[j] && interval <= dayArray[j + 1]) {
      divisor = Math.pow(2, j + 1)
      break
    } else if (interval < dayArray[0]) {
      divisor = Math.pow(2, 0)
      break
    } else {
      divisor = Math.pow(2, 4)
      break
    }
  }
  return 87500 / divisor
}

const timeInterval = function(options) {
  const today_0 = options.today
  const today_1 = _.cloneDeep(today_0).add(6, 'h')
  const today_2 = _.cloneDeep(today_1).add(6, 'h')
  const today_3 = _.cloneDeep(today_2).add(6, 'h')
  const now = options.now.unix()
  let result
  if (now < today_1.unix()) {
    result = today_0
  } else if (today_1.unix() <= now && now < today_2.unix()) {
    result = today_1
  } else if (today_2.unix() <= now && now < today_3.unix()) {
    result = today_2
  } else {
    result = today_3
  }
  return result
}

const timeExchange = function(options) {
  const result = []
  let temp = null
  const rightNow = timeInterval(options)
  result.push(rightNow)
  for (let i = 1; i < 4 * 15; i++) {
    temp = _.cloneDeep(rightNow).subtract(6 * i, 'h')
    result.push(temp)
  }
  return result
}


const marketPrice = async function(options) {
  const ret = timeExchange(options)
  let key,
    temp,
    offset
  const prices = []
  for (let i = 0; i < ret.length; i++) {
    key = `peatio:${options.market}:k:1`
    temp = await options.ctx.app.redis.get('kline').lindex(key, 0)
    if (!temp || temp === '') {
      throw new Error(`first ${key} not in redis`)
    }
    temp = JSON.parse(temp)[0]
    offset = (ret[i].unix() - temp) / 60
    if (offset < 0) {
      throw new Error(`${ret[i].unix()} is small than ${temp}`)
    }
    temp = await options.ctx.app.redis.get('kline').lindex(key, offset)
    if (!temp || temp === '') {
      throw new Error(`${ret[i].unix()} ${key} not in redis`)
    }
    prices.push(JSON.parse(temp)[1])
  }
  return prices
}

const lastTwoMini = function(options) {
  return parseFloat(options.num.toFixed(2))
}

const atMiningCost = function(options) {
  return lastTwoMini({ num: options.basic / atRelease({ interval: options.interval }) })
}

module.exports.mapiSignature = mapiSignature
module.exports.getTokenByRefreshToken = getTokenByRefreshToken
module.exports.base = base
module.exports.getRefreshTokenFromMapi = getRefreshTokenFromMapi
module.exports.marketPrice = marketPrice
module.exports.atMiningCost = atMiningCost
module.exports.timeExchange = timeExchange
