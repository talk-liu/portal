
module.exports = {
  Query: {
    async allCurrency(root, params, ctx) {
      return await ctx.connector.allCurrency.get(params)
    },
    async coinTotal(root, params, ctx) {
      return await ctx.connector.allCurrency.total(params)
    },
    async optionCurrencies(root, params, ctx) {
      return await ctx.connector.allCurrency.getOptionCurrencies(params)
    },
    async frontedCurrency(root, {}, ctx) {
      return await ctx.connector.allCurrency.getFrontedCurrency()
    }
  },
}
