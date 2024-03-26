
module.exports = {
  Query: {
    pendingKLine(root, {market,limit,period,_t,trade_id}, ctx) {
      if(!trade_id) {
        trade_id = 0
      }
      return ctx.connector.pendingKLine.get({market,limit,period,_t,trade_id})
    },
  },
}