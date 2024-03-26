
const util = require('./util')
const Basic = require('./basic')

class ComputingPower extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'computingPower'
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
      count: 4,
      estimated: 50,
      blocks:
        [
          { beu:
            { btc: '1.69526088',
              eth: '64.90517506999999999',
              usdt: '185294.56546281999952441' },
          key: 'riostox:bi:miningpower:2018-08-02:4',
          start_date: '2018-08-02T18:00:00.000+08:00',
          end_date: '2018-08-03T00:00:00.000+08:00' },
          { beu:
            { btc: '3.26936993',
              eth: '45.34106676',
              usdt: '184808.5754119500001309' },
          key: 'riostox:bi:miningpower:2018-08-03:1',
          start_date: '2018-08-03T00:00:00.000+08:00',
          end_date: '2018-08-03T06:00:00.000+08:00' },

          { beu:
            { btc: '1.01384531',
              eth: '48.71023727',
              usdt: '243926.99231574000008038' },
          key: 'riostox:bi:miningpower:2018-08-03:2',
          start_date: '2018-08-03T06:00:00.000+08:00',
          end_date: '2018-08-03T12:00:00.000+08:00' },

          { beu:
            { btc: '1.61331016',
              eth: '19.93515678',
              usdt: '108389.48424729000115008' },
          key: 'riostox:bi:miningpower:2018-08-03:3',
          start_date: '2018-08-03T12:00:00.000+08:00',
          end_date: '2018-08-03T18:00:00.000+08:00' }] }
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = ComputingPower
