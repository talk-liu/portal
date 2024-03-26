module.exports = {
  Query: {
    async optionAccount(root, params, ctx) {
      return await ctx.connector.optionAccount.get(params)
    }
  }
}
