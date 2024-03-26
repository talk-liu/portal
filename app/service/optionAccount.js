
const Service = require('egg').Service
class OptionAccount extends Service {

  async get(params) {
    // this.ctx.logger.debug('OptionAccount service', JSON.stringify(params))
    // todo 过滤掉不属于用户的其他币种
    return await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionAccount')
    // return this.ctx.helper.filter({ origin, category: 'optionAccount' })
  }
}

module.exports = OptionAccount
