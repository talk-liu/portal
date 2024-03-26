
const Service = require('egg').Service

class ApiTokenService extends Service {

  async getApiToken() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'apiToken')
    return { result }
  }

  async postApiToken(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'post' }, 'apiToken')
    return { result }
  }

  async updateApiToken(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'update' }, 'apiToken')
    return { result }
  }

  async deleteApiToken(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'delete' }, 'apiToken')
    return { result }
  }
}

module.exports = ApiTokenService
