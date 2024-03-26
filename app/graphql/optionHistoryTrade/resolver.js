module.exports = {
  Query: {
    async optionHistoryTrade(root, params, ctx) {
      return await ctx.connector.optionHistoryTrade.get(params)
    },

    async historyTrade(root, params, ctx) {
      return await ctx.connector.optionHistoryTrade.historyTrade(params)
    }
  }
}
