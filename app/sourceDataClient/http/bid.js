const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class Bid extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'bid'
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
    switch (options.category) {
      case 'get':
        return null
      case 'update':
        return data
      case 'delete':
      case 'add':
      default:
        return null
    }
  }

  async get() { return null }

  async update({ market, volume, price, ord_type, percent }) {
    const options = {}
    options.category = 'update'
    options.jsonParams = {}
    if (market) {
      options.jsonParams.market = market
    }
    if (volume) {
      options.jsonParams.volume = volume
    }
    if (price) {
      options.jsonParams.price = price
    }
    if (ord_type) {
      options.jsonParams.ord_type = ord_type
    }
    if (percent) {
      options.jsonParams.percent = percent
    }
    return await this.base(options)
  }

  async delete() { return null }

  async add() { return null }
}

module.exports = Bid
