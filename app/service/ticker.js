
const Service = require('egg').Service

class TickerService extends Service {
  async get(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'ticker')
    return { markets: result }
  }
}

module.exports = TickerService
