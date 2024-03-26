module.exports = {
  Query: {
    optionBalance(root, {}, ctx) {
      return ctx.connector.optionBalance.get()
    },
  },
}
