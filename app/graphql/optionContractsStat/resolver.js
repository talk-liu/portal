module.exports = {
  Query: {
    async optionContractsStat(root, params, ctx) {
      return await ctx.connector.optionContractsStat.get(params)
    }
  }
}
