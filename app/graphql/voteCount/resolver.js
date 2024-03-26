
module.exports = {
  Query: {
    voteCount(root, {period}, ctx) {
      return ctx.connector.voteCount.get(period)
    },
  },
}