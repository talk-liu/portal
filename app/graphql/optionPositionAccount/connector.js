const DataLoader = require('dataloader')
const _ = require('lodash')

class OptionPositionAccountConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    const result = await this.ctx.service.optionPositionAccount.get(params)
    if(_.isArray(result)) {
      for(let i = 0; i < result.length; i++) {
        if(!_.isUndefined(result[i].max)) {
          result[i].position_limit = result[i].max
        }
      }
    }
    return  result
  }
}

module.exports = OptionPositionAccountConnector
