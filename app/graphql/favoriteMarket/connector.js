const DataLoader = require('dataloader')

class FavoriteMarketConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.favoriteMarket.get()
  }

  update(market) {
    return this.ctx.service.favoriteMarket.update(market)
  }

  delete(market) {
    return this.ctx.service.favoriteMarket.delete(market)
  }
}

module.exports = FavoriteMarketConnector

