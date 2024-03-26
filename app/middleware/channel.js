
// const base64 = require('base-64')
// const Cookie = require('cookie')

const _ = require('lodash')

module.exports = () => {
  return async function channel(ctx, next) {
    const path = ctx.request.path
    // const origin = ctx.origin
    // if (origin === 'https://rus.riostox.com') {
    //   if (path !== '/portal/api/signup') {
    //     ctx.status = 403
    //     return
    //   }
    // }

    if (decodeURIComponent(path).indexOf('<') > 0) {
      ctx.status = 403
      return ctx.redirect('/')
    }

    let afterSessionId,
      target
    const redisClient = ctx.app.redis.get('default')
    if (!ctx.sessionId) {
      const ret = await ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
      if (!_.isUndefined(ret.session_id)) {
        afterSessionId = ret.session_id
        ctx.cookies.set(ctx.app.config.sessionKey, afterSessionId, { domain: ctx.app.config.exchangeFrontedSpecialCfg.domain })
      } else {
        ctx.logger.error('mapi session interface : ', ret)
        return await next()
      }
      // const url = ctx.app.config.exchangeFrontedSpecialCfg.baseUrl + '/timestamp'
      // let basicString,
      //   opt
      // if (ctx.app.config.exchangeFrontedSpecialCfg.baseAuth) {
      //   const baseAuth = ctx.app.config.exchangeFrontedSpecialCfg.baseAuth
      //   basicString = 'Basic ' + base64.encode(baseAuth.user + ':' + baseAuth.password)
      // }
      // if (basicString) {
      //   opt = { headers: { authorization: basicString } }
      // }
      // const ret = await ctx.app.curl(url, opt)
      // if (ret.status !== 200) {
      //   // ctx.logger.error('channel timestamp error : ', ret.status)
      //   return await next()
      // }
      // const cookie = ret.res.headers['set-cookie']
      // for (let i = 0; i < cookie.length; i++) {
      //   if (cookie[i].includes(ctx.app.config.sessionKey)) {
      //     const parsed = Cookie.parse(cookie[i])
      //     afterSessionId = parsed ? parsed[ctx.app.config.sessionKey] : ''
      //     break
      //   }
      // }

    }

    if (!ctx.sessionId) {
      target = afterSessionId
    } else {
      target = ctx.sessionId
    }

    if (!path.match(/\/graphql*/g) && !path.match(/\/portal*/g)) {
      const utm_source = ctx.query.utm_source || ctx.cookies.get('utm_source')
      if (utm_source && utm_source.length < 50) {
        const redisSession = await redisClient.get(`s:${target}`)
        if (!redisSession) {
          await redisClient.set(`s:${target}`, JSON.stringify({ utm_source }), 'EX', 12 * 60 * 60)
        } else {
          try {
            const jsonSession = JSON.parse(redisSession)
            jsonSession.utm_source = utm_source
            await redisClient.set(`s:${target}`, JSON.stringify(jsonSession), 'EX', 12 * 60 * 60)
          } catch (err) {
            // ctx.logger.error('channel session error : ', err)
          }
        }
      }
    }
    return await next()
  }
}
