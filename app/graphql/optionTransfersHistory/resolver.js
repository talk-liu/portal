module.exports = {
  Query: {
    async optionTransfersHistory(root, params, ctx) {
      return await ctx.connector.optionTransfersHistory.get(params)
    }
  }
}
