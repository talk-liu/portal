
module.exports = {
  Mutation: {

    async twoFactor(root, params, ctx) {
      return ctx.connector.message.factor(params)
    },

    async confirmFactor(root, params, ctx) {
      return ctx.connector.message.confirmFactor(params)
    },

    async appFactor(root, params, ctx) {
      return ctx.connector.message.appFactor(params)
    },

    async resetPassword(root, params, ctx) {
      return ctx.connector.message.resetPassword(params)
    },

    async documentSms(root, params, ctx) {
      return ctx.connector.message.documentSms(params)
    },

    async appFactorOtp(root, {}, ctx) {
      return ctx.connector.message.appFactorOtp()
    }
  }
}