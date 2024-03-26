
module.exports = {
  Query: {
    kline(root, {markets,limit,period}, ctx) {
      let params = {}
      params['markets'] = markets
      if(limit) {
        params['limit'] = limit
      }
      if(period) {
        params['period'] = period
      }
      return ctx.connector.kline.get(params)
    },
  },
}
