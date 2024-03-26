
const Service = require('egg').Service

class TransfersHistory extends Service {

  async post(params) {
    // this.ctx.logger.debug('TransfersHistory service', JSON.stringify(params))
    // return this.ctx.helper.mock('transfers').data
    return this.ctx.service.generalRequest.request(params, { method: 'update' }, 'optionTransfer')
  }
}

module.exports = TransfersHistory
