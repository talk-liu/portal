
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class Ieo extends Service {

  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'ieo.js')
  }

  async initClient() {
    const ieo = require(await this.loadPath())
    return new ieo(util.serviceParams({
      class: 'ieo',
      ctx: this.ctx
    }))
  }

  async submitOrder(params) {
    this.ctx.logger.debug('submitOrder', JSON.stringify(params))
    const ieoClient = await this.initClient()
    const result = ieoClient.submitOrder(params)
    return result
  }

  async ieoInfo(params) {
    this.ctx.logger.debug('ieoInfo: params', JSON.stringify(params))
    const ieoClient = await this.initClient()
    return ieoClient.ieoInfo(params)
  }

  async orderList(params) {
    this.ctx.logger.debug('ieoInfo: params', JSON.stringify(params))
    const ieoClient = await this.initClient()
    return ieoClient.orderList(params)
  }

}

module.exports = Ieo
