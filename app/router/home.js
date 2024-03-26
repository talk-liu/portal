

module.exports = app => {
  const { router, controller } = app
  // router.get('/option', controller.option.index)
  // router.get('/option/', controller.option.index)
  // router.get('/option/*', controller.option.index)
  // router.get('/option/*/*', controller.option.index)
  router.get('/healthcheck', controller.home.healthcheck)
  router.get('/*', controller.home.index)
  // router.get('/at-mining', controller.home.index)
  // router.get('/vote', controller.home.index)
  // router.get('/vote-detail', controller.home.index)
  // router.get('/', controller.home.index)
  // router.get('/pro/*/', controller.home.index)
  // router.get('/pro/*/*', controller.home.index)
  // router.get('/active/*', controller.home.index)
  // router.get('/history', controller.home.index)
  // router.get('/history/*', controller.home.index)
}
