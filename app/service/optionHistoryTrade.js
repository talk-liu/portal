
const Service = require('egg').Service

class OptionHistoryTradesService extends Service {

  async get(params) {
    // this.ctx.logger.debug('history trades service', JSON.stringify(params))
    // return this.ctx.helper.mock('history_trades').data
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionHistoryTrade')
  }

  async historyTrade(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'historyTrade')
  }
}

module.exports = OptionHistoryTradesService
