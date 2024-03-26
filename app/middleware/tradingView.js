
const url = require('url')
const querystring = require('querystring')
const _ = require('lodash')

module.exports = () => {
  return async function tradingView(ctx, next) {
    const reqUrl = ctx.request.url
    const urlAfterParse = url.parse(reqUrl)
    if (urlAfterParse.search.indexOf('?') === -1) {
      ctx.body = ctx.helper.tradingViewError('wrong url')
      return
    }
    const params = querystring.parse(urlAfterParse.query)
    if (!params.client) {
      ctx.body = ctx.helper.tradingViewError('no client')
      return
    }
    if (!params.user) {
      ctx.body = ctx.helper.tradingViewError('no user')
      return
    }
    if (_.isUndefined(ctx.currentMemberId)) {
      ctx.body = ctx.helper.tradingViewError('need log in')
      return
    }
    // if(params.user !== ctx.currentMemberId) {
    //   ctx.body = ctx.helper.tradingViewError('wrong user')
    //   return
    // }
    if (ctx.request.method === 'OPTIONS') {
      ctx.body = { status: 'ok' }
      return
    }
    ctx.mountTradingView({ clientId: params.client, userId: ctx.currentMemberId, template: params.template })
    await next()
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')

  }
}
