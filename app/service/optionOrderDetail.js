
const Service = require('egg').Service

class OptionOrderDetailService extends Service {

  async get(params) {
    // this.ctx.logger.debug('OptionOrderDetailService', JSON.stringify(params))
    // return this.ctx.helper.mock('order_details').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionOrderDetail')
  }
}

module.exports = OptionOrderDetailService
