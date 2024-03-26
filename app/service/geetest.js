const Service = require('egg').Service

class Geetest extends Service {
  async registerGeetest() {
    return this.ctx.service.generalRequest.request({}, { method: 'get' }, 'registerGeetest')
  }
}

module.exports = Geetest
