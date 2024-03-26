async function checkSessionIfExpired(ctx, next) {
  const result = await ctx.app.redis.get('default').get(`s:${ctx.sessionId}`)
  if (!result) {
    ctx.body = {
      success: false,
      isAuth: false,
      message: 'required auth'
    }
  } else {
    await next()
  }
}

module.exports = app => {
  const { router, controller } = app
  router.get('/portal/blank', controller.restful.index)
  router.get('/portal/otc', controller.restful.otc)
  router.get('/portal/transferHistory', controller.restful.transferHistory)
  router.get('/portal/transifex', controller.restful.transifex)
  router.get('/portal/optionCurrencies', controller.restful.optionCurrencies)
  router.get('/portal/optionAccount', controller.restful.optionAccount)
  router.get('/portal/competition', controller.restful.competition)

  // tradingview 保存用户指标喜好
  router.get('/portal/1.1/study_templates', controller.restful.tradingViewLoad)
  router.post('/portal/1.1/study_templates', controller.restful.tradingViewSave)
  router.delete('/portal/1.1/study_templates', controller.restful.tradingViewDel)

  // 文件上传
  router.post('/portal/user/document', checkSessionIfExpired, controller.restful.document)

  router.get('/sitemap.xml', controller.restful.siteMap)
  router.get('/robots.txt', controller.restful.robots)

  // SendPulse-rest-api
  router.post('/portal/add_email', controller.restful.addEmail)
  router.get('/portal/email_info', controller.restful.EmailInfo)

  // csv
  router.get('/history/:type', controller.restful.exportCsv) // type分为history、trades

  router.post('/pusher/auth', controller.restful.pusherAuth)

  // signup
  // router.post('/portal/api/signup', controller.restful.signup)
}
