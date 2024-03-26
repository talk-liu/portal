module.exports = {
  Query: {
    newBanner (root, {}, ctx) {
      return ctx.connector.newBanner.get()
    }
  }
}