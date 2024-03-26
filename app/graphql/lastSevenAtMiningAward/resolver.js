module.exports = {
  Query: {
    lastSevenAtMiningAwards(root, {}, ctx) {
      return ctx.connector.lastSevenAtMiningAward.fetchLastSevenAtMiningAward()
    },
  },
}