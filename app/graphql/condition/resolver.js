
module.exports = {
  Mutation: {
    conditionCancel(root, params, ctx) {
      return ctx.connector.condition.cancel(params)
    },
    conditionCreate(root, params, ctx) {
      return ctx.connector.condition.create(params)
    },
    conditionClear(root, {}, ctx) {
      return ctx.connector.condition.clear()
    }
  },

  Query: {
    async conditionCurrent(root, params, ctx) {
      return await ctx.connector.condition.getCurrent(params)
    },
    async conditionHistory(root, params, ctx) {
      return await ctx.connector.condition.getHistory(params)
    }
  }
}