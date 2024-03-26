
const Basic = require('./basic')
const appUtil = require('../../util/index')

class VoteCoin extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'voteCoin'
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
    let redisData
    const data = {}
    let voteico = this.params.ctx.app.config.voteCoin
    try {
      if (options.ctx.app.config.env === 'pre') {
        voteico = voteico + ':pre'
      }
      redisData = await options.ctx.app.redis.get('portal').get(voteico)
      if (!redisData || redisData === '') {
        throw new Error('get voteico from redis is null')
      }
      redisData = JSON.parse(redisData)
      data.voteInfo = redisData
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
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = VoteCoin
