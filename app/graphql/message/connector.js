
const DataLoader = require('dataloader')

class MessageConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async factor(params) {
    return this.ctx.service.message.factor(params)
  }

  async confirmFactor(params) {
    return this.ctx.service.message.confirmFactor(params)
  }

  async appFactor(params) {
    return this.ctx.service.message.appFactor(params)
  }

  async resetPassword(params) {
    return this.ctx.service.message.resetPassword(params)
  }

  async documentSms(params) {
    return this.ctx.service.message.documentSms(params)
  }

  async appFactorOtp() {
    return this.ctx.service.message.appFactorOtp()
  }
}

module.exports = MessageConnector

