
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class TradingViewService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'tradingView.js')
  }

  async initClient() {
    const tradingView = require(await this.loadPath())
    return new tradingView(util.serviceParams({
      class: 'tradingView',
      ctx: this.ctx
    }))
  }

  async save(params) {
    params.clientId = this.ctx.tradingView.clientId
    params.userId = this.ctx.tradingView.userId
    const tradingViewInstance = await this.initClient()
    return tradingViewInstance.add(params)
  }

  async del() {
    const tradingViewInstance = await this.initClient()
    return tradingViewInstance.delete(this.ctx.tradingView)
  }

  async load(params) {
    params.clientId = this.ctx.tradingView.clientId
    params.userId = this.ctx.tradingView.userId
    const tradingViewInstance = await this.initClient()
    return tradingViewInstance.get(params)
  }

}

module.exports = TradingViewService
