
const util = require('../util/index')
module.exports = () => {
  return async function authenticate(ctx, next) {

    if (util.authGraphql({ ctx })) {
      return ctx.unauthorized()
    }

    if (util.ifGraphql({ ctx })) {
      return await next()
    }

    const ret = util.parseClassFromCtx({ ctx })
    const mutationNoAcl = ctx.app.config.mutationNoAcl
    for (let i = 0; i < mutationNoAcl.length; i++) {
      if (ret === mutationNoAcl[i]) {
        return await next()
      }
    }

    if (util.parseActionFromCtx({ ctx })) {
      if (!ctx.currentMemberId) {
        return ctx.unauthorized()
      }
      return await next()
    }

    if (ret) {
      if (util.ifNeedAcl({
        class: ret,
        ctx
      }) && ret !== 'member') {
        if (!ctx.currentMemberId) {
          return ctx.unauthorized()
        }
      }
    }
    return await next()
  }
}
