module.exports = {
  Query: {
    async optionPositionAccount(root, params, ctx) {
      return await ctx.connector.optionPositionAccount.get(params)
    }
  }
}
