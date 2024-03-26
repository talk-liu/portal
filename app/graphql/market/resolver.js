
module.exports = {
  Query: {
    market(root, {id}, ctx) {
      return ctx.connector.market.getMMarket()
    }
  },
}