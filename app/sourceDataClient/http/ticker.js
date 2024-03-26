
const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class Ticker extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'ticker'
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
    const result = {}
    switch (options.category) {
      case 'get':
        result.markets = data
        return result
      case 'update':
      case 'delete':
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

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Ticker
