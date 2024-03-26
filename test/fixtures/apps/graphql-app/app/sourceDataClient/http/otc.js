const util = require('./util')
const Basic = require('./basic')

class Otc extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'otc'
    options.lang = this.params.lang
    options.memberId = this.params.memberId
    options.sessionId = this.params.sessionId
    options.redis = this.params.redis
    try {
      await util.base(options)
    } catch (err) {
      throw new Error(err)
    }
    switch (options.category) {
      case 'get':
        return {
          otc_opened: true,
          usdt_cny_exchange_rate: 7.1
        }
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


module.exports = Otc
