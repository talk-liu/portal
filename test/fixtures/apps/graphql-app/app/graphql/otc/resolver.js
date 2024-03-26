
module.exports = {
  Query: {
    otc(root, {}, ctx) {
      return ctx.connector.otc.get()
    },
  },
}