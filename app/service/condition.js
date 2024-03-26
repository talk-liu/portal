
const Service = require('egg').Service

class Condition extends Service {

  async getCurrent(params) {
    // this.ctx.logger.debug('Condition service getCurrent', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'condition')
  }

  async getHistory(params) {
    // this.ctx.logger.debug('Condition service getHistory', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'getAll' }, 'condition')
  }

  async create(params) {
    // this.ctx.logger.debug('Condition service create', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'create' }, 'condition')
  }

  async cancel(params) {
    // this.ctx.logger.debug('Condition service cancel', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'delete' }, 'condition')
  }

  async clear() {
    return this.ctx.service.generalRequest.request({}, { method: 'clear' }, 'condition')
  }

}

module.exports = Condition
