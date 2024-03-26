module.exports = {
  Query: {
    async optionOrderDetail(root, params, ctx) {
      return await ctx.connector.optionOrderDetail.get(params)
    }
  }
}
