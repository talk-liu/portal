
const Controller = require('egg').Controller
const util = require('../util')

class HomeController extends Controller {
  async index() {
    const gonRender = await this.ctx.helper.renderMultiInterface()
    const pusher = await this.ctx.helper.renderPusher()
    gonRender.pusher = pusher
    const transifex = await this.ctx.helper.renderTX()
    gonRender.transifex = transifex
    const { banner, announce, registerActive } = await this.ctx.helper.renderBanner()
    gonRender.banner = banner || '{}'
    gonRender.announce = announce || '{}'
    gonRender.registerActive = registerActive || '{}'
    gonRender.adList = await this.ctx.helper.adList() || '{}'

    const tradingviewScript = await this.ctx.helper.renderTVScript()
    const seoLink = this.ctx.helper.renderSeoLink()

    const staticHash = await util.staticHash({
      redis: this.ctx.app.redis,
      config: this.ctx.app.config
    })

    let target = 'index'
    if (this.ctx.getLang() === 'en') {
      target = await this.ctx.helper.parseProMarket()
    }

    await this.ctx.render('index.nj', {
      title: this.ctx.__(`${target}.title`),
      description: this.ctx.__(`${target}.description`),
      keywords: this.ctx.__('index.keywords'),
      staticServer: this.config.staticServer,
      staticHash,
      gonRender,
      seoLink,
      tradingviewScript
    })
  }

  async healthcheck() {
    this.ctx.status = 200
  }
}

module.exports = HomeController
