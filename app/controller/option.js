
const Controller = require('egg').Controller
const util = require('../util')

class OptionController extends Controller {
  async index() {
    const gonRender = await this.ctx.helper.renderMultiInterface()
    const pusher = await this.ctx.helper.renderPusher()
    gonRender.pusher = pusher

    const userAgent = this.ctx.request.header['user-agent']
    gonRender.userAgent = JSON.stringify({ value: false })
    if (!userAgent || userAgent.indexOf('riostox') < -1) {
      gonRender.userAgent = JSON.stringify({ value: true })
    }
    const transifex = await this.ctx.helper.renderTX()
    gonRender.transifex = transifex
    const staticHash = await util.staticOptionHash({
      redis: this.ctx.app.redis,
      config: this.ctx.app.config
    })
    const tradingviewScript = await this.ctx.helper.renderTVScript()
    await this.ctx.render('option.nj', {
      title: this.ctx.__('index.title'),
      description: this.ctx.__('index.description'),
      keywords: this.ctx.__('index.keywords'),
      staticServer: this.config.staticOptionServer,
      staticHash,
      tradingviewScript,
      gonRender
    })
  }
}

module.exports = OptionController
