
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class VoucherService extends Service {
  async historyVoucher(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'historyVoucher' }, 'voucher')
  }

  async inactiveVoucher() {
    return this.ctx.service.generalRequest.request({}, { method: 'inactiveVoucher' }, 'voucher')
  }


  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'voucher.js')
  }

  async initClient() {
    const voucher = require(await this.loadPath())
    return new voucher(util.serviceParams({
      class: 'voucher',
      ctx: this.ctx
    }))
  }

  async get() {
    const voucherInstance = await this.initClient()
    return voucherInstance.get()
  }
}

module.exports = VoucherService
