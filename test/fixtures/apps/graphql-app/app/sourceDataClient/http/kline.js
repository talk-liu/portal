
const util = require('./util')
const Basic = require('./basic')

class Kline extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'kline'
    try {
      await util.base(options)
    } catch (err) {
      return null
    }
    switch (options.category) {
      case 'get':
        return {
          result: {
            atbtc: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]],
            atusdt: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]],
            ateth: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]]
          }
        }
      case 'update':
      case 'delete':
      case 'add':
        return null
      default:
        return null
    }
  }

  // todo 参数不明确
  async get(params) {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    options.jsonParams.market = params.markets
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Kline
