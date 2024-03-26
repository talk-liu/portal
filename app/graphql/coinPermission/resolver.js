
module.exports = {
  Query: {
    async deliveryCurrency(root, {}, ctx) {
      return await ctx.connector.coinPermission.getDeliveryCurrency()
    },
    async optionPermission(root, {}, ctx) {
      return await ctx.connector.coinPermission.getOptionPermission()
    }
  }
}