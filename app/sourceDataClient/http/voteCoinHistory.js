
const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class VoteCoinHistory extends Basic {
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
    let data = null
    try {
      data = await util.base(options)
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
    const secret = 'S@ohSSGsj8Fi'
    const uid = this.params.memberId
    const result = {}
    const options = {}
    options.category = 'get'
    options.jsonParams = { secret, uid }
    options.whichRouter = 'napi'
    options.class = 'voteCoinHistory'
    result.voteRewardHistory = await this.base(options)
    options.class = 'voteCoin'
    result.voteHistoryInfo = await this.base(options)
    return result
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = VoteCoinHistory
