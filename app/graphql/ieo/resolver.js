


module.exports = {
  Query: {

    async submitOrder(root, params, ctx) {
      return ctx.connector.ieo.submitOrder(params)
    },

    async ieoInfo(root, params, ctx){
      return ctx.connector.ieo.ieoInfo(params)
    },

    async ieoHistoryOrderList(root, params, ctx){
      return ctx.connector.ieo.orderList(params)
    },
  },

}
