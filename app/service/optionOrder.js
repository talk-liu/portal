
const Service = require('egg').Service

class OptionOrderService extends Service {

  async get(params) {
    // this.ctx.logger.debug('query order service', JSON.stringify(params))
    // return this.ctx.helper.mock('orders').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionOrder')
  }
  async create(params) {
    // this.ctx.logger.debug('create order service', JSON.stringify(params))
    // return this.ctx.helper.mock('create_order').data
    return this.ctx.service.generalRequest.request(params, { method: 'add' }, 'optionCreateOrder')
  }
  async clear(params) {
    // this.ctx.logger.debug('clear order service', JSON.stringify(params))
    // return this.ctx.helper.mock('clear_orders').data
    return this.ctx.service.generalRequest.request(params, { method: 'delete' }, 'optionClearOrder')
  }
  async cancel(params) {
    // this.ctx.logger.debug('cancel_order service', JSON.stringify(params))
    // return this.ctx.helper.mock('cancel_order').data
    return this.ctx.service.generalRequest.request(params, { method: 'delete' }, 'optionCancelOrder')
  }
}

module.exports = OptionOrderService
