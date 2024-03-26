
const Service = require('egg').Service

class OptionKLineService extends Service {

  async getPendding(params) {
    // this.ctx.logger.debug('option kline getPendding service', JSON.stringify(params))
    // return this.ctx.helper.mock('kline').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionPenddingKLine')
  }
  async getByCode(params) {
    // this.ctx.logger.debug('option kline getByCode service', JSON.stringify(params))
    // return this.ctx.helper.mock('kline').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionKLineByCode')
  }
  async getByCodes(params) {
    // this.ctx.logger.debug('option kline getByCodes  service', JSON.stringify(params))
    // return this.ctx.helper.mock('kline').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionKLineByCodes')
  }
}

module.exports = OptionKLineService
