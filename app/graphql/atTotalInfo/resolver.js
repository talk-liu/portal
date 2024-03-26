module.exports = {
  Query: {
    atTotalInfos(root, {}, ctx) {
      return ctx.connector.atTotalInfo.fetchAtTotalInfo()
    },
  },
}