const util = require('./util')
const Basic = require('./basic')

class FavoriteMarket extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'favoriteMarket'
    let data = null
    try {
      data = await util.base(options)
    } catch (err) {
      return null
    }
    const ret = {}
    switch (options.category) {
      case 'get':
        ret.fm = data
        return ret
      case 'update':
      case 'delete':
        return { market: data.result }
      case 'add':
        return null
      default:
        return null
    }
  }

  async get() {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    // return await this.base(options)
    return {
      fm: [ 'atbtc', 'atusdt', 'ateth' ]
    }
  }

  async update(market) {
    const options = {}
    options.category = 'update'
    options.jsonParams = {
      market_id: market
    }
    return await this.base(options)
  }

  async delete(market) {
    const options = {}
    options.category = 'delete'
    options.jsonParams = {
      market_id: market
    }
    return await this.base(options)
  }

  async add() { return null }
}

module.exports = FavoriteMarket
