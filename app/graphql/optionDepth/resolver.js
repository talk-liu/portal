module.exports = {
  Query: {
    async optionDepth(root, params, ctx) {
      return await ctx.connector.optionDepth.get(params)
    }
  }
}
