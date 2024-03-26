// mapi 通用请求

const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')
class GeneralRequest extends Basic {
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
      throw err
    }
    return data
  }
  /**
   * 发送mapi请
   * @param {Object} params http 请求参数
   * @param {Object} config 配置
   * @param {String} name config api 的名字
   * @return {Object} mapi返回的数据
   */
  async request(params, { method }, name) {
    const options = {}
    options.category = method
    options.class = name
    options.jsonParams = {}
    let result = null
    if (params) {
      options.jsonParams = params
    }
    result = await this.base(options)
    return result
  }
}


module.exports = GeneralRequest
