
const Service = require('egg').Service

class AtGame extends Service {

  async atGameTaskList(params) {
    this.ctx.logger.debug('atGameTaskList', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'atGameTaskList' }, 'atGame')
  }

  async atGameRewardHis(params) {
    this.ctx.logger.debug('atGameTaskList', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'atGameRewardHis' }, 'atGame')
  }

}

module.exports = AtGame
