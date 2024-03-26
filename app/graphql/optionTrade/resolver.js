module.exports = {
  Query: {
    async optionTrade(root, params, ctx) {
      return await ctx.connector.optionTrade.get(params)
    }
  }
}
