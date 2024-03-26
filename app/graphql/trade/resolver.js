const _ = require('lodash')
module.exports = {
  Query: {
    trade(root, {market, limit}, ctx) {
      if(_.isUndefined(limit)) {
        limit = 25
      }
      return ctx.connector.trade.get({market, limit})
    },
  },
}