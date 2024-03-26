module.exports = {
  Query: {
    async optionOrder(root, opts, ctx) {
      const result = await ctx.connector.optionOrder.get(opts)
      return result 
    }
  },
  Mutation:{
    async optionClearOrder(root, params, ctx) {
      const result = await ctx.connector.optionOrder.clear(params)
      return result 
    },
    async optionCancelOrder(root, params, ctx) {
      const result = await ctx.connector.optionOrder.cancel(params)
      return result 
    },
    async optionCreateOrder(root, params, ctx) {
      const result = await ctx.connector.optionOrder.create(params)
      return  result 
    }
  }
}
