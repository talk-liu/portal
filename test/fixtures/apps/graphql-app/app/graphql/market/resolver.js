
module.exports = {
  Query: {
    market(root, {id}, ctx) {
      return ctx.connector.market.get(id)
    },
    markets(root, {}, ctx) {
      return ctx.connector.market.get()
    }
  },
}