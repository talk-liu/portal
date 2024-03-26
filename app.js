
class AppBootHook {

  constructor(app) {
    this.app = app
  }
  async didReady() {
    const app = this.app
    if (app.config.env === 'prod' || app.config.env === 'pre') {
      const newrelic = require('newrelic')
      app.locals.newrelic = newrelic
    }
    try {
      const ctx = app.createAnonymousContext()
      await ctx.helper.addMarket()
      await ctx.helper.initProMarket()
    } catch (e) {
      console.log('didReady', JSON.stringify(e))// eslint-disable-line
    }
  }
}

module.exports = AppBootHook
