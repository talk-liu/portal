
const Service = require('egg').Service

class ProxyService extends Service {

  async redirect(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'update' }, 'redirect_path')
    return { result }
  }

}

module.exports = ProxyService
