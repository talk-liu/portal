
module.exports = {
  Query: {
    voteCoinHistory(root, {}, ctx) {
      return ctx.connector.voteCoinHistory.get()
    },
  },
}