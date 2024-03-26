module.exports = () => {
  return async function(ctx, next) {
    if (ctx.request.path.indexOf('/healthcheck') === 0) {
      ctx.body = 'alive'
    } else {
      return await next()
    }
  }
}
