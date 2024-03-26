const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')
const _ = require('lodash')

class PendingKLine extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'pendingKLine'
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
    let data = {}
    try {
      data = await util.base(options)
      if (!_.isArray(data.k)) {
        data.k = []
      }
      if (!_.isArray(data.trades)) {
        data.trades = []
      }
    } catch (err) {
      throw new Error(err)
    }
    switch (options.category) {
      case 'get':
        return data
      case 'update':
      case 'delete':
      case 'add':
      default:
        return null
    }
  }

  async get({ market, limit, period, _t, trade_id }) {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    if (market) {
      options.jsonParams.market = market
    }
    if (limit) {
      options.jsonParams.limit = limit
    }
    if (period) {
      options.jsonParams.period = period
    }
    if (_t) {
      options.jsonParams._t = _t
    }
    if (!_.isUndefined(trade_id)) {
      options.jsonParams.trade_id = trade_id
    }
    options.whichRouter = 'exchange'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = PendingKLine
