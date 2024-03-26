module.exports = {
  Mutation: {
    async signin(root, params, ctx) {
      const result = await ctx.connector.userSignin.signin(params)
      return { result }
    },
    async signup(root, params, ctx) {
      const result = await ctx.connector.userSignin.signup(params)
      return { result }
    },
    async twoFrontendFactor(root, params, ctx) {
      const result = await ctx.connector.userSignin.twoFrontendFactor(params)
      return { result }
    },
    async authTwoFactor(root, params, ctx) {
      const result = await ctx.connector.userSignin.authTwoFactor(params)
      return { result }
    },
    async signout(root, {}, ctx) {
      const result = await ctx.connector.userSignin.signout()
      return { result }
    },
    async activationEmail(root, params, ctx) {
      const result = await ctx.connector.userSignin.activationEmail(params)
      return { result }
    },
    async activate(root, params, ctx) {
      const result = await ctx.connector.userSignin.activate(params)
      return { result }
    }
  },
  Query: {
    async session(root, {}, ctx) {
      const result = await ctx.connector.userSignin.session()
      return { result }
    }
  }
}
