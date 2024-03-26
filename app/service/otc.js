
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class OtcService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'otc.js')
  }

  async initClient() {
    const otc = require(await this.loadPath())
    return new otc(util.serviceParams({
      class: 'otc',
      ctx: this.ctx
    }))
  }

  async get() {
    const otcInstance = await this.initClient()
    return otcInstance.get()
  }

  async getPaymentOrder({ payment_id }) {
    const result = await this.ctx.service.generalRequest.request({ payment_id }, { method: 'getOne' }, 'newOtc')
    return { result }
  }

  async getPaymentOrderList({ page, page_size, state }) {
    const result = await this.ctx.service.generalRequest.request({ page, page_size, state }, { method: 'getAll' }, 'newOtc')
    return { result }
  }

  async getQuote({ digital_currency, fiat_currency, requested_currency, requested_amount }) {
    const result = await this.ctx.service.generalRequest.request({ digital_currency, fiat_currency, requested_currency, requested_amount }, { method: 'getQuote' }, 'newOtc')
    return { result }
  }

  async createPaymentOrder({ quote_id }) {
    const result = await this.ctx.service.generalRequest.request({ quote_id }, { method: 'create' }, 'newOtc')
    return { result }
  }
}

module.exports = OtcService
