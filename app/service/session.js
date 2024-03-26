
const Service = require('egg').Service

class SessionService extends Service {

  async get() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'session')
    return { result }
  }

}

module.exports = SessionService
