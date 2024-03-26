
module.exports = {
  Query: {
    ticker(root, { }, ctx) {
      return ctx.connector.ticker.get()
    },
    async optionTicker(root, params, ctx) {
      const result = await ctx.connector.ticker.getOptionTicker(params)
      return { markets: result }
    }
  },
}