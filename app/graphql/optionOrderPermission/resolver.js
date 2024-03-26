
module.exports = {
  Query: {
    optionOrderPermission(root, {}, ctx) {
      return ctx.connector.optionOrderPermission.get()
    }
  }
}