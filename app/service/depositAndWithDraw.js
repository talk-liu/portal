
const Service = require('egg').Service

class DepositAndWithDrawService extends Service {

  async getWithdrawAddress() {
    return this.ctx.service.generalRequest.request({}, { method: 'get' }, 'withdrawAddress')
  }

  async getDepositHistory(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'depositHistory' }, 'withdrawAddress')
  }
  async postApplicants(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'applicants' }, 'withdrawAddress')
  }
  async postSdkTokenKyc(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'sdkTokenKyc' }, 'withdrawAddress')
  }
  async postCheckKyc(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'checkKyc' }, 'withdrawAddress')
  }

  async getWithdrawsHistory(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'withdrawsHistory' }, 'withdrawAddress')
  }

  async getAccountTransferHistory(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'accountTransferHistory' }, 'withdrawAddress')
  }

  async verify(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'verify' }, 'withdrawAddress')
    return { result }
  }

  async resend(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'resend' }, 'withdrawAddress')
    return { result }
  }

  async create(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'create' }, 'withdrawAddress')
    return { result }
  }

  async deleteAddress(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'deleteAddress' }, 'withdrawAddress')
    return { result }
  }

  async createAddress(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'createAddress' }, 'withdrawAddress')
    return { result }
  }

  async factor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'factor' }, 'withdrawAddress')
    return { result }
  }

  async me() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'me' }, 'withdrawAddress')
    return { result }
  }

  async atVipGrade() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'atVipGrade' }, 'withdrawAddress')
    return { result }
  }

  async vipLevel() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'vipLevel' }, 'withdrawAddress')
    return { result }
  }

  async depositAddress(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'depositAddress' }, 'withdrawAddress')
    return { result }
  }

  async confirmFactor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'confirmFactor' }, 'withdrawAddress')
    return { result }
  }

  async appFactor(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'appFactor' }, 'withdrawAddress')
    return { result }
  }

  async resetPassword(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'resetPassword' }, 'withdrawAddress')
    return { result }
  }

  async documentSms(params) {
    const result = await this.ctx.service.generalRequest.request(params, { method: 'documentSms' }, 'withdrawAddress')
    return { result }
  }

  async appFactorOtp() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'appFactorOtp' }, 'withdrawAddress')
    return { result }
  }

}

module.exports = DepositAndWithDrawService
