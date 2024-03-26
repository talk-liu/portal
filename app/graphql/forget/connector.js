
const DataLoader = require('dataloader')

class ForgetConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async forgetPassword(params) {
    return this.ctx.service.forget.forgetPassword(params)
  }

  async forgetPasswordCode(params) {
    return this.ctx.service.forget.forgetPasswordCode(params)
  }

  async forgetPsw(params) {
    return this.ctx.service.forget.forgetPsw(params)
  }

  async resetForgetPassword(params) {
    return this.ctx.service.forget.resetForgetPassword(params)
  }
}

module.exports = ForgetConnector

