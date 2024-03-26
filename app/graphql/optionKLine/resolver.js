module.exports = {
  Query: {
    async optionKLineByCodes(root, params, ctx) {
      return await ctx.connector.optionKLine.optionKLineByCodes(params)
    },
    async optionKLineByCode(root, params, ctx) {
      return await ctx.connector.optionKLine.optionKLineByCode(params)
    },
    async optionPenddingKLine(root, params, ctx) {
      return await ctx.connector.optionKLine.optionPenddingKLine(params)
    }
  }
}
