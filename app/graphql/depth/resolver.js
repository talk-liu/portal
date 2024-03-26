
module.exports = {
  Query: {
    depth(root, {market}, ctx) {
      return ctx.connector.depth.get({market})
    },
  },
}