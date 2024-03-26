module.exports = {
  Query: {
    favoriteMarket(root, {}, ctx) {
      return ctx.connector.favoriteMarket.get()
    }
  },
  Mutation: {
    updateFavoriteMarket(root, {market}, ctx) {
      return ctx.connector.favoriteMarket.update(market)
    },
    deleteFavoriteMarket(root, {market}, ctx) {
      return ctx.connector.favoriteMarket.delete(market)
    }
  }
}