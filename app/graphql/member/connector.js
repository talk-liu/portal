
const DataLoader = require('dataloader')

class MemberConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.member.get()
  }

  verify(params) {
    return this.ctx.service.member.verify(params)
  }
  faceppVerify() {
    return this.ctx.service.member.faceppVerify()
  }
  document(params) {
    return this.ctx.service.member.document(params)
  }

  historyMining(params) {
    return this.ctx.service.member.historyMining(params)
  }

  historyProfits(params) {
    return this.ctx.service.member.historyProfits(params)
  }

  captcha() {
    return this.ctx.service.member.captcha()
  }
  challenge() {
    return this.ctx.service.member.challenge()
  }
}

module.exports = MemberConnector

