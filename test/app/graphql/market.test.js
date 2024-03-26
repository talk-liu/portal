const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/market.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql markets { id name}', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ markets { id name} }')
      .expect(200)

    const exp = [
      {
        id: 'atbtc',
        ask_fixed: 1,
        at: new Date(),
        base_unit: 'at',
        bid_fixed: 0,
        buy: '0.1',
        change: '0.1',
        funds: '0.1',
        high: '0.1',
        last: '0.1',
        name: '0.1',
        open: '0.1',
        quote_unit: '0.1',
        sell: '0.1',
        volume: '0.1'
      },
      {
        id: 'ateth',
        ask_fixed: 1,
        at: new Date(),
        base_unit: 'at',
        bid_fixed: 0,
        buy: '0.1',
        change: '0.1',
        funds: '0.1',
        high: '0.1',
        last: '0.1',
        name: '0.1',
        open: '0.1',
        quote_unit: '0.1',
        sell: '0.1',
        volume: '0.1'
      }
    ]
    return assert(exp, resp.body.data)


    // return app.httpRequest()
    //   .get('/graphql?query={ markets { id name} }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     assert(response.type, 'text/html')
    //   })
  })
})
