const util = require('./util')
const Basic = require('./basic')

class Member extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'member'
    let data = null
    try {
      data = await util.base(options)
    } catch (err) {
      return null
    }
    switch (options.category) {
      case 'get':
        data.id = data.member_id
        return data
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
      id: 'lll',
      sn: 'lll',
      email: 'll@126.com',
      activated: true,
      id_document_state: 'll',
      id_document_verified: true
    }
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = Member
