const DataLoader = require('dataloader')

class OptionUserAuthenticateConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  getAgree() {
    return this.ctx.helper.isOptionAgree()
  }

  setAgree() {
    return this.ctx.service.optionUserAuthenticate.setAgree()
  }
}

module.exports = OptionUserAuthenticateConnector

