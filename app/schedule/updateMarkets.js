module.exports = {
  schedule: {
    interval: '1m',
    type: 'worker'
  },
  async task(ctx) {
    let markets
    try {
      // markets = await ctx.service.generalRequest.request({}, { method: 'get' }, 'mMarket')
      // for (let i = 0; i < markets.length; i++) {
      //   await ctx.app.redis.get('default').sadd('portal_newest_markets', markets[i].id)
      // }
      markets = await ctx.service.generalRequest.request({}, { method: 'get' }, 'ticker')
      for (const key in markets) {
        await ctx.app.redis.get('portal').sadd(ctx.app.config.portalNewestMarkets, key)
      }
    } catch (err) {
      return ctx.logger.error(`schedule market existed ${err}`)
    }
  }
}
