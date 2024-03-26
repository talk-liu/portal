
module.exports = {
  Query: {
    isMiner(root, {}, ctx) {
      return ctx.connector.isMiner.get()
    },
  },
}