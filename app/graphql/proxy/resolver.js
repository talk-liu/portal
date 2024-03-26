
module.exports = {
  Mutation: {
    async redirect(root, params, ctx) {
      return ctx.connector.proxy.redirect(params)
    }
  }
}