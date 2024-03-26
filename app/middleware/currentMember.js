const util = require('../util/index')

module.exports = () => {
  return async function currentMember(ctx, next) {
    // ctx.logger.debug('currentMember middleware : ', ctx.request.path)
    await ctx.getCurrentMemberId()
    // ctx.logger.debug('currentMember middleware : ', ctx.currentMemberId)
    if (util.ifGraphql({ ctx })) {
      return await next()
    }
    if (ctx.request.path.indexOf('/graphql') === 0) {
      if (util.parseActionFromCtx({ ctx })) {
        await ctx.getCurrentMemberId()
        return await next()
      }
      const ret = util.parseClassFromCtx({ ctx })
      if (ret) {
        if (util.ifNeedAcl({
          class: ret,
          ctx
        })) {
          if (ret === 'member') {
            // ctx.logger.debug('member in middle is : ', ctx.currentMemberId)
          }
        }
      }
    }
    return await next()
  }
}
