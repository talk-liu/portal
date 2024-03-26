
module.exports = {
  Query: {
    platformProfit(root, {}, ctx) {
      return ctx.connector.platformProfit.get()
    },
  },
}