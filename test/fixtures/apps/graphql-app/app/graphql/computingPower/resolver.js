module.exports = {
  Query: {
    computingPower(root, {}, ctx) {
      return ctx.connector.computingPower.fetchComputingPower()
    },
  },
}