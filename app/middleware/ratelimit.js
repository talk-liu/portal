const Limiter = require('ratelimiter')
// const ms = require('ms')

async function thenify(fn) {
  return await new Promise(function (resolve, reject) {
    function callback(err, res) {
      if (err) return reject(err)
      return resolve(res)
    }
    fn(callback)
  })
}

module.exports = () => {
  let opts = {}
  return async function ratelimit(ctx, next) {
    opts = ctx.app.config.ratelimit
    opts.db = ctx.app.redis.get('portal')
    const {
      remaining = 'X-RateLimit-Remaining',
      reset = 'X-RateLimit-Reset',
      total = 'X-RateLimit-Limit',
    } = opts.headers || {}
    let id
    const ips = ctx.ips
    if (!ips) {
      id = opts.id ? opts.id(ctx) : ctx.ip
    } else if (ips.indexOf(',') < 0) {
      id = ips
    } else {
      const tempIps = ips.split(',')
      id = tempIps[0]
    }
    id = id + ctx.sessionId
    // ctx.logger.debug(`portal rateLimit ips is ${ctx.ips}`)
    // ctx.logger.debug(`portal rateLimit ip from ${id}`)
    if (id === false) return await next()
    const limiter = new Limiter(Object.assign({}, opts, { id }))
    const limit = await thenify(limiter.get.bind(limiter))
    const calls = limit.remaining > 0 ? limit.remaining - 1 : 0
    const disableHeader = opts.disableHeader || false
    let headers = {}
    if (!disableHeader) {
      headers = {
        [remaining]: calls,
        [reset]: limit.reset,
        [total]: limit.total,
      }
      ctx.set(headers)
    }
    if (limit.remaining) return await next()
    // const delta = (limit.reset * 1000) - Date.now() || 0
    const after = limit.reset - Date.now() / 1000 || 0
    ctx.set('Retry-After', after)
    ctx.status = 429
    // ctx.logger.debug(`Rate limit exceeded, retry in ${ms(delta, { long: true })}.`)
    ctx.redirect(ctx.app.config.errorPage)
  }
}
