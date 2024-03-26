const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class OrderHistory extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'order24hHistory'
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
    const data = {}
    try {
      data.history = await util.base(options)
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

  async get({ per_page }) {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    if (per_page) {
      options.jsonParams.per_page = per_page
    }
    options.whichRouter = 'exchange'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = OrderHistory
