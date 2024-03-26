
const Service = require('egg').Service

class OptionPositionAccount extends Service {

  async get(params) {
    // this.ctx.logger.debug('OptionPositionAccount service', JSON.stringify(params))
    // return this.ctx.helper.mock('position_accounts').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionPositionAccount')
  }
}

module.exports = OptionPositionAccount
