
const util = require('./util')
const Basic = require('./basic')

class Market extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'market'
    let data = null
    try {
      data = await util.base(options)
    } catch (err) {
      return null
    }
    switch (options.category) {
      case 'get':
        return data // todo 数据结构格式
      case 'update':
      case 'delete':
      case 'add':
        return null
      default:
        return null
    }
  }

  async get(id) {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    if (id) {
      options.jsonParams.market_id = id
    }
    // return await this.base(options)
    const ret = [
      {
        id: 'atbtc',
        ask_fixed: 1,
        at: new Date(),
        base_unit: 'at',
        bid_fixed: 0,
        buy: '0.1',
        change: '0.1',
        funds: '0.1',
        high: '0.1',
        last: '0.1',
        name: '0.1',
        open: '0.1',
        quote_unit: '0.1',
        sell: '0.1',
        volume: '0.1'
      },
      {
        id: 'ateth',
        ask_fixed: 1,
        at: new Date(),
        base_unit: 'at',
        bid_fixed: 0,
        buy: '0.1',
        change: '0.1',
        funds: '0.1',
        high: '0.1',
        last: '0.1',
        name: '0.1',
        open: '0.1',
        quote_unit: '0.1',
        sell: '0.1',
        volume: '0.1'
      }
    ]
    return ret
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Market
