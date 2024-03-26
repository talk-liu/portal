
const Service = require('egg').Service

class OptionTradeService extends Service {

  async get(params) {
    // this.ctx.logger.debug('option trades service', JSON.stringify(
    //   params
    // ))
    // return this.ctx.helper.mock('trades').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionTrade')
  }
}

module.exports = OptionTradeService
