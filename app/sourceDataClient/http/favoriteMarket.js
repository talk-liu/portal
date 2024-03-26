const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class FavoriteMarket extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'favoriteMarket'
    options.lang = this.params.lang
    options.ctx = this.params.ctx
    if (appUtil.ifNeedAcl({
      class: options.class,
      ctx: options.ctx
    })) {
      options.memberId = this.params.memberId
      options.sessionId = this.params.sessionId
      options.redis = this.params.redis
    }
    let data = null
    try {
      data = await util.base(options)
    } catch (err) {
      throw new Error(err)
    }
    // options.ctx.logger.debug('FavoriteMarket base', options.category, this.params.memberId, JSON.stringify(data))
    const ret = {}
    switch (options.category) {
      case 'get':
        ret.fm = data
        return ret
      case 'update':
      case 'delete':
        ret.market = data.result
        return ret
      case 'add':
      default:
        return null
    }
  }

  async get() {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    return await this.base(options)
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
