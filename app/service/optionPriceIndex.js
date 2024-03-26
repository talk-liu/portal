
const Service = require('egg').Service

class OptionPriceIndexService extends Service {

  async get(params) {
    // this.ctx.logger.debug('OptionPriceIndexService service', JSON.stringify(params))
    // return this.ctx.helper.mock('price_indexs').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionPriceIndex')
  }
}

module.exports = OptionPriceIndexService
