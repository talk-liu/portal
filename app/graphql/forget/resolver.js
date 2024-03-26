
module.exports = {
  Mutation: {

    async forgetPassword(root, params, ctx) {
      return ctx.connector.forget.forgetPassword(params)
    },

    async forgetPasswordCode(root, params, ctx) {
      return ctx.connector.forget.forgetPasswordCode(params)
    },

    async forgetPsw(root, params, ctx) {
      return ctx.connector.forget.forgetPsw(params)
    },

    async resetForgetPassword(root, params, ctx) {
      return ctx.connector.forget.resetForgetPassword(params)
    }
  }
}