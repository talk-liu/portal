
module.exports = {
  Mutation: {
    async optionSetAgree(root, {}, ctx) {
      return await ctx.connector.optionUserAuthenticate.setAgree()
    }
  },
  Query: {
    async optionAgree(root, {}, ctx) {
      return await ctx.connector.optionUserAuthenticate.getAgree()
    }
  }
}