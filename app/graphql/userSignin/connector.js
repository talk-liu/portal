const DataLoader = require('dataloader')

class UserSigninConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async signin(params) {
    return this.ctx.service.userSignin.signin(params)
  }
  async signup(params) {
    return this.ctx.service.userSignin.signup(params)
  }
  async twoFrontendFactor(params) {
    return this.ctx.service.userSignin.twoFrontendFactor(params)
  }
  async authTwoFactor(params) {
    return this.ctx.service.userSignin.authTwoFactor(params)
  }
  async signout() {
    return this.ctx.service.userSignin.signout()
  }
  async activationEmail(params) {
    return this.ctx.service.userSignin.activationEmail(params)
  }
  async activate(params) {
    return this.ctx.service.userSignin.activate(params)
  }
  async session() {
    return this.ctx.service.userSignin.session()
  }
}

module.exports = UserSigninConnector
