

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/restful')(app)
  require('./router/home')(app)
}
