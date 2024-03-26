
module.exports = {
  Mutation: {
    async proxyAuth(root, params, ctx) {
      return ctx.connector.telegram.proxyAuth(params)
    }
  }
}