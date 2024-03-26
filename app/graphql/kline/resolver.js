
module.exports = {
  Query: {
    kline(root, {markets,limit,period,timestamp,to}, ctx) {
      let params = {}
      params['markets'] = markets
      if(limit) {
        params['limit'] = limit
      }
      if(period) {
        params['period'] = period
      }
      if(timestamp) {
        params['timestamp'] = timestamp
      }
      if(to) {
        params['to'] = to
      }
      return ctx.connector.kline.get(params)
    },

    singleKLine(root, {market,limit,period,timestamp,to}, ctx) {
      let params = {}
      params['market'] = market
      if(limit) {
        params['limit'] = limit
      }
      if(period) {
        params['period'] = period
      }
      if(timestamp) {
        params['timestamp'] = timestamp
      }
      if(to) {
        params['to'] = to
      }
      return ctx.connector.kline.getSingleKLine(params)
    }
  },
}
