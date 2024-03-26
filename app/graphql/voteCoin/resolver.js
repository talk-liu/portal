
module.exports = {
  Query: {
    voteCoin(root, {}, ctx) {
      return ctx.connector.voteCoin.get()
    },
  },
}