
const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class Telegram extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
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
      data.result = await util.base(options)
    } catch (err) {
      throw new Error(err)
    }
    switch (options.category) {
      case 'post':
        return data
      case 'update':
      case 'delete':
      case 'add':
      default:
        return null
    }
  }

  async proxyAuth(params) {
    // const secret = 'S@ohSSGsj8Fi'
    // const uid = this.params.memberId
    const options = {}
    params.secret = this.params.ctx.app.config.napiSecret
    params.uid = this.params.memberId
    options.category = 'post'
    options.jsonParams = params
    options.whichRouter = 'napi'
    options.class = 'proxyAuth'
    // this.params.ctx.logger.debug('proxyAuth options', JSON.stringify(options))
    return await this.base(options)
  }

  async get() { return null }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Telegram
