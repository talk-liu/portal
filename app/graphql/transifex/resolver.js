module.exports = {
  Query: {
    transifex (root, { }, ctx) {
      return ctx.connector.transifex.get()
    }
  }
}