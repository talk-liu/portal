
const Service = require('egg').Service

class OptionDepethService extends Service {

  async get(params) {
    // this.ctx.logger.debug('depth service', JSON.stringify(params))
    // return this.ctx.helper.mock('depth').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionDepth')
  }
}

module.exports = OptionDepethService
