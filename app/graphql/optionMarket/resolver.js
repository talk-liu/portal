module.exports = {
  Query: {
    async optionMarket(root, params, ctx) {
      params.ifSorted = false
      return await ctx.connector.optionMarket.get(params)
    },

    async sortedOptionMarket(root, params, ctx) {
      params.ifSorted = true
      return await ctx.connector.optionMarket.get(params)
    }
  }
}