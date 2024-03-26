
const Service = require('egg').Service

class MessageService extends Service {

  async factor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'factor' }, 'message')
    return { result }
  }

  async confirmFactor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'confirmFactor' }, 'message')
    return { result }
  }

  async appFactor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'appFactor' }, 'message')
    return { result }
  }

  async resetPassword(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'resetPassword' }, 'message')
    return { result }
  }

  async documentSms(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'documentSms' }, 'message')
    return { result }
  }

  async appFactorOtp() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'appFactorOtp' }, 'message')
    return { result }
  }

}

module.exports = MessageService
