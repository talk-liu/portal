
module.exports = {
  Query: {
    orderHistory(root, {state,per_page}, ctx) {
      return ctx.connector.orderHistory.get({state,per_page})
    },
  },
}