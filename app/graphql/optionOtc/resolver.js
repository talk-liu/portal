
module.exports = {
  Query: {
    optionOtc(root, {}, ctx) {
      return ctx.connector.optionOtc.get()
    },
  },
}