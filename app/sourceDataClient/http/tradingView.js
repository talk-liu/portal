const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class TradingView extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'tradingView'
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
    let data
    try {
      data = await util.base(options)
    } catch (err) {
      throw new Error(err)
    }
    switch (options.category) {
      case 'get':
        return data
      case 'add':
        return data
      case 'delete':
        return data
      case 'update':
      default:
        return null
    }
  }

  async get(params) {
    const options = {}
    options.category = 'get'
    options.jsonParams = params
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async update() { return null }

  async delete(params) {
    const options = {}
    options.category = 'delete'
    options.jsonParams = params
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async add(params) {
    const options = {}
    options.category = 'add'
    options.jsonParams = params
    options.whichRouter = 'napi'
    return await this.base(options)
  }
}


module.exports = TradingView
