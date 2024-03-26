
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class FavoriteMarketService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'favoriteMarket.js')
  }

  async initClient() {
    const favoriteMarket = require(await this.loadPath())
    return new favoriteMarket(util.serviceParams({
      class: 'favoriteMarket',
      ctx: this.ctx
    }))
  }

  async get() {
    const favoriteMarketInstance = await this.initClient()
    return favoriteMarketInstance.get()
  }

  async update(market) {
    const favoriteMarketInstance = await this.initClient()
    return favoriteMarketInstance.update(market)
  }

  async delete(market) {
    const favoriteMarketInstance = await this.initClient()
    return favoriteMarketInstance.delete(market)
  }
}

module.exports = FavoriteMarketService
