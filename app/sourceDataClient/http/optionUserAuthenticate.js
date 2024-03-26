const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class OptionUserAuthenticate extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'optionUserAuthenticate'
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
        return { result: data }
      case 'update':
        return { result: data }
      case 'delete':
      case 'add':
      default:
        return null
    }
  }

  async get() {
    const options = {}
    const secret = this.params.ctx.app.config.napiSecret
    const uid = this.params.memberId
    options.category = 'get'
    options.jsonParams = { secret, uid }
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async update() {
    const options = {}
    const secret = this.params.ctx.app.config.napiSecret
    const uid = this.params.memberId
    options.category = 'update'
    options.jsonParams = { secret, uid }
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async delete() { return null }

  async add() { return null }
}


module.exports = OptionUserAuthenticate
