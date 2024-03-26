const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/otc.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql otc {otc_opened usdt_cny_exchange_rate}', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ otc {otc_opened usdt_cny_exchange_rate} }')
      .expect(200)

    const exp = {
      otc_opened: true,
      usdt_cny_exchange_rate: 7.1
    }

    return assert(exp, resp.body.data)
    // return app.httpRequest()
    //   .get('/graphql?query={ member { id name created_at} }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     assert(response.type, 'text/html')
    //   })
  })
})
