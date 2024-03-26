
const DataLoader = require('dataloader')

class DepositAndWithDrawConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async getWithdrawAddress() {
    return this.ctx.service.depositAndWithDraw.getWithdrawAddress()
  }

  async getAccountTransferHistory(params) {
    return this.ctx.service.depositAndWithDraw.getAccountTransferHistory(params)
  }

  async getDepositHistory(params) {
    return this.ctx.service.depositAndWithDraw.getDepositHistory(params)
  }

  async postApplicants(params) {
    return this.ctx.service.depositAndWithDraw.postApplicants(params)
  }
  async postSdkTokenKyc(params) {
    return this.ctx.service.depositAndWithDraw.postSdkTokenKyc(params)
  }
  async postCheckKyc(params) {
    return this.ctx.service.depositAndWithDraw.postCheckKyc(params)
  }

  async getWithdrawsHistory(params) {
    return this.ctx.service.depositAndWithDraw.getWithdrawsHistory(params)
  }

  async verify(params) {
    return this.ctx.service.depositAndWithDraw.verify(params)
  }

  async resend(params) {
    return this.ctx.service.depositAndWithDraw.resend(params)
  }

  async create(params) {
    return this.ctx.service.depositAndWithDraw.create(params)
  }

  async deleteAddress(params) {
    return this.ctx.service.depositAndWithDraw.deleteAddress(params)
  }

  async createAddress(params) {
    return this.ctx.service.depositAndWithDraw.createAddress(params)
  }

  async factor(params) {
    return this.ctx.service.depositAndWithDraw.factor(params)
  }

  async depositAddress(params) {
    return this.ctx.service.depositAndWithDraw.depositAddress(params)
  }

  async confirmFactor(params) {
    return this.ctx.service.depositAndWithDraw.confirmFactor(params)
  }

  async appFactor(params) {
    return this.ctx.service.depositAndWithDraw.appFactor(params)
  }

  async resetPassword(params) {
    return this.ctx.service.depositAndWithDraw.resetPassword(params)
  }

  async documentSms(params) {
    return this.ctx.service.depositAndWithDraw.documentSms(params)
  }

  async appFactorOtp() {
    return this.ctx.service.depositAndWithDraw.appFactorOtp()
  }

  async me() {
    return this.ctx.service.depositAndWithDraw.me()
  }

  async atVipGrade() {
    return this.ctx.service.depositAndWithDraw.atVipGrade()
  }

  async vipLevel() {
    return this.ctx.service.depositAndWithDraw.vipLevel()
  }
}

module.exports = DepositAndWithDrawConnector

