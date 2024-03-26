const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/kline.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql kline(markets: \"atusdt,atusdt,ateth\") {result}', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ kline(markets:\"atusdt,atusdt,ateth\") {result} }')
      .expect(200)

    const exp = {
      result: {
        atbtc: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]],
        atusdt: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]],
        ateth: [[ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ], [ 1529280000, 10.4949, 10.8906, 6.9206, 7.988, 436845.1393 ]]
      }
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
