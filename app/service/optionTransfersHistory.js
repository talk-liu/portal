
const Service = require('egg').Service

class OptionTransfersHistory extends Service {

  async get(params) {
    // this.ctx.logger.debug('OptionTransfersHistory service', JSON.stringify(params))
    // return this.ctx.helper.mock('option_transfers_history').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionTransfersHistory')
  }
}

module.exports = OptionTransfersHistory
