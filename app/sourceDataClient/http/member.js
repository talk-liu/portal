const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class Member extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'member'
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
    options.ctx.helper.alog('checkMemberIssue http', JSON.stringify({
      memberId: options.memberId,
      sessionId: options.sessionId
    }))
    // options.ctx.logger.debug('memberId in httpClient is : ', options.memberId, ', sessionId in httpClient is : ', options.sessionId)
    let data = null
    if (!this.params.memberId || !this.params.sessionId) {
      return data
    }
    try {
      data = await util.base(options)
      options.ctx.helper.alog('checkMemberIssue http data', JSON.stringify({
        data
      }))

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


module.exports = Member
