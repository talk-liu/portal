
module.exports = {
  Query: {
    income(root, {}, ctx) {
      return ctx.connector.income.get()
    },
  },
}