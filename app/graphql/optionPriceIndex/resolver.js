module.exports = {
  Query: {
    async optionPriceIndex(root, params, ctx) {
      return await ctx.connector.optionPriceIndex.get(params)
    }
  }
}
