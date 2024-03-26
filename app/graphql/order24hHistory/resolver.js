
module.exports = {
  Query: {
    order24hHistory(root, {per_page}, ctx) {
      return ctx.connector.order24hHistory.get({per_page})
    },
  },
}