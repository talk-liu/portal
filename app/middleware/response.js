
// 返回mapi错误码
function handleMapiErrorCode(ctx) {
  const body = ctx.response.body
  ctx.mapiErrCode = global.mapiErrCode || null
  ctx.originErr = global.originErr || {}
  delete global.mapiErrCode
  delete global.originErr
  if (body && ctx.mapiErrCode != null) {
    try {
      const newBody = JSON.parse(body)
      if (newBody.errors.length && newBody.errors[0].message) {
        newBody.errors[0].errorCode = ctx.mapiErrCode
        newBody.errors[0].originErr = ctx.originErr
        ctx.response.body = JSON.stringify(newBody)
      }
    } catch (e) {
      ctx.logger.debug('handleMapiErrorCode', e.message)
    }
  }
  ctx.originErr = ctx.mapiErrCode = null
}
module.exports = () => {
  return async function response(ctx, next) {
    ctx.set('x-powered-by', 'riostox')
    process.env.GIT_COMMIT_HASH && ctx.set('x-hash', process.env.GIT_COMMIT_HASH)
    await next()
    handleMapiErrorCode(ctx)
  }
}
