
const util = require('./util')
const Basic = require('./basic')

class Income extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'income'
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
      at_ratio: 'lj',
      finished_cache: 'lj',
      frozen_at: {
        n: 'll'
      }
    }
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Income
