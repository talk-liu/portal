module.exports = {
  Query: {
    lastSevenAtAwards(root, {}, ctx) {
      return ctx.connector.lastSevenAtAward.fetchLastSevenAtAward()
    },
  },
}