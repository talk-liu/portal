const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class OptionOtc extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'optionOtc'
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
    const optionsOtc = [ 'hkd', 'cny', 'rub', 'krw', 'eur', 'gbp' ]
    const optionOtcKey = this.params.ctx.app.config.optionOtcKey
    const redisData = await this.params.ctx.app.redis.get('portal').get(optionOtcKey)
    const redisDataLength = redisData ? Object.keys(JSON.parse(redisData)).length : 0
    if (!redisData && redisDataLength !== optionsOtc.length) {
      try {
        const ret = await util.base(options)
        for (let i = 0; i < ret.length; i++) {
          if (ret[i].name === 'usd_hkd' || ret[i].name === 'usd_cny' || ret[i].name === 'usd_rub' || ret[i].name === 'usd_krw' || ret[i].name === 'usd_eur' || ret[i].name === 'usd_gbp') {
            data[ret[i].name] = ret[i].rate
          }
        }
        await this.params.ctx.app.redis.get('portal').set(optionOtcKey, JSON.stringify(data), 'EX', 60 * 30)
      } catch (err) {
        throw new Error(err)
      }
    } else {
      data = JSON.parse(redisData)
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
    options.whichRouter = 'huobi'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = OptionOtc
