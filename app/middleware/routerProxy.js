// const moment = require('moment')
require('moment-timezone')

module.exports = () => {
  return async function routerProxy(ctx, next) {
    const path = ctx.request.path

    const defaultRedis = ctx.app.redis.get('portal')
    if (!ctx.currentMemberId && !path.match(/\/graphql*/g) && !path.match(/\/portal*/g)
      && !path.match(/\/sitemap.xml/g) && !path.match(/\/robots.txt/g)) {
      const params = {}
      params.session_id = ctx.sessionId
      params.path = ctx.app.config.exchangeFrontedSpecialCfg.baseUrl + ctx.request.url
      const langs = ctx.app.config.lang
      let temp
      for (const key in langs) {
        temp = '/' + key + '/settings'
        if (temp === path) {
          ctx.logger.debug(`${path} no need redirect_path`)
          params.path = ctx.app.config.exchangeFrontedSpecialCfg.baseUrl
          break
        }
      }
      try {
        await ctx.service.generalRequest.request(params, { method: 'update' }, 'redirect_path')
      } catch (err) {
        ctx.logger.debug(`redirect_path : ${err}`)
      }
    }

    if (path.indexOf('settings') >= 0 && ctx.currentMemberId
        && typeof ctx.currentMemberId === 'number') {
      // 清理member的缓存
      await defaultRedis.del(`portal-member-${ctx.currentMemberId}`)
    }

    if (path === '/pro' || path === '/pro/' || path === '/pro/markets' || path === '/pro/markets/') {
      return ctx.redirect('/pro/markets/btcusdt')
    }

    if (ctx.path.indexOf('/markets/') > -1) {
      const market = ctx.path.split('/markets/')[1]
      const ifRealMarket = await ctx.app.redis.get('portal').sismember(ctx.app.config.portalNewestMarkets, market)
      if (!ifRealMarket) {
        ctx.status = 404
        return
      }
    }

    return await next()
  }
}
