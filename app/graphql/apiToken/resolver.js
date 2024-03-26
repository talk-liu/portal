
module.exports = {
  Query: {
    getApiToken(root, {}, ctx) {
      return ctx.connector.apiToken.getApiToken()
    }
  },
  Mutation: {
    postApiToken(root, params, ctx) {
      return ctx.connector.apiToken.postApiToken(params)
    },
    updateApiToken(root, params, ctx) {
      return ctx.connector.apiToken.updateApiToken(params)
    },
    deleteApiToken(root, params, ctx) {
      return ctx.connector.apiToken.deleteApiToken(params)
    },
  }
}