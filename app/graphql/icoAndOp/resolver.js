
module.exports = {
  Query: {
    icoAndOp(root, {}, ctx) {
      return ctx.connector.icoAndOp.get()
    },
  },
}