module.exports = {
  Mutation: {
    async transfer(root, params, ctx) {
      const result = await ctx.connector.transfer.post(params)
      return { result }
    }
  }
}
