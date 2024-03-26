
const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')

class Ieo extends Basic {
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
      options.class = 'ieo'
      data = await util.base(options)
    } catch (err) {
      throw new Error(err)
    }
    return data
  }

  async getTransformRate(params) {
    const options = {}
    options.jsonParams = params
    options.whichRouter = 'ieo'
    options.category = 'getTransformRate'
    return await this.base(options)
  }

  async salePercent(params) {
    const options = {}
    options.jsonParams = params
    options.whichRouter = 'ieo'
    options.category = 'salePercent'
    return await this.base(options)
  }

  async submitOrder(params) {
    const options = {}
    options.jsonParams = params
    options.whichRouter = 'ieo'
    options.category = 'submitOrder'
    const result = await this.base(options)
    return {
      data: result
    }
  }

  async ieoInfo(params) {
    const options = {}
    options.jsonParams = params
    options.whichRouter = 'ieo'
    options.category = 'ieoInfo'
    return await this.base(options)
  }

  async orderList(params) {
    const options = {}
    options.jsonParams = params
    options.whichRouter = 'ieo'
    options.category = 'orderList'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Ieo
