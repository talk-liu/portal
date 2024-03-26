
module.exports = {
  Mutation: {
    bid(root, {market,volume,price,ord_type,percent}, ctx) {
      return ctx.connector.order.postBid({market,volume,price,ord_type,percent})
    },
    ask(root, {market,volume,price,ord_type,percent}, ctx) {
      return ctx.connector.order.postAsk({market,volume,price,ord_type,percent})
    },

    cancelOrder(root, {id}, ctx) {
      return ctx.connector.order.deleteOne({id})
    },
    clearOrder(root, {side}, ctx) {
      return ctx.connector.order.deleteAll({side})
    }
  },

  Query: {
    async order(root, params, ctx) {
      return await ctx.connector.order.getOrder(params)
    }
  }
}