
const Service = require('egg').Service

class OptionFundsTransfersHistoryService extends Service {

  async get(params) {
    // this.ctx.logger.debug('fundTransfers history service', JSON.stringify(params))
    // return this.ctx.helper.mock('funds_transfers_history').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionFundsTransfersHistory')
  }
}

module.exports = OptionFundsTransfersHistoryService
