const util = require('./util')
const Basic = require('./basic')

class AllMarkets extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'allMarkets'
    options.lang = this.params.lang
    options.ctx = this.params.ctx
    const data = { allMarkets: [] }
    try {
      const result = await util.base(options)
      data.allMarkets = result || []
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
    const secret = this.params.ctx.app.config.napiSecret
    const options = {}
    options.category = 'get'
    options.jsonParams = { secret }
    options.whichRouter = 'napi'
    options.class = 'allMarkets'
    return this.base(options)
  }

  async update() {
    return null
  }

  async delete() {
    return null
  }

  async add() {
    return null
  }
}

module.exports = AllMarkets
