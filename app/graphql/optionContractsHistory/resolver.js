const _ = require('lodash')
module.exports = {
  Query: {
    async optionContractsHistory(root, params, ctx) {
      const stateLimit = ctx.app.config.mapiCommonCfg.urls.optionContractsHistory.get.restriction.state
      if(!_.isUndefined(params.state)) {
        if(params.state.indexOf(',') < 0) {
          if(!stateLimit.includes(params.state)) {
            return null
          }
        } else {
          const temp = params.state.split(',')
          for(let i = 0; i < temp.length; i++) {
            if(!stateLimit.includes(temp[i])) {
              return null
            }
          }
        }
      }
      return await ctx.connector.optionContractsHistory.get(params)
    }
  }
}
