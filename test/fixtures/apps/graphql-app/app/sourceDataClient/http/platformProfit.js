
const util = require('./util')
const Basic = require('./basic')

class PlatformProfit extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'platformProfit'
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

  async get() {
    const options = {}
    options.category = 'get'
    options.jsonParams = {}
    // return await this.base(options)
    return {
      at_profit_rate: '001',
      current_profit: {
        lj: '001'
      },
      distributed: {
        lj: '001'
      },
      members_seven_days_at: '001',
      platform_seven_days_at: '001',
      total_at: 1,
      total_at_delivered: '001',
      total_profit: {
        lj: '001'
      },
      unit_at_profit: '001',
      yesterday_profit: {
        lj: '001'
      }
    }
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = PlatformProfit
