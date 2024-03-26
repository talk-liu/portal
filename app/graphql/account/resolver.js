
module.exports = {
  Query: {
    account(root, {market}, ctx) {
      return ctx.connector.account.get(market)
    },
  },
}