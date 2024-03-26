const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/favoriteMarket.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql favoriteMarket { fm }', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ favoriteMarket { fm } }')
      .expect(200)

    const exp = {
      fm: [ 'atbtc', 'atusdt', 'ateth' ]
    }
    return assert(exp, resp.body.data)
    // return app.httpRequest()
    //   .get('/graphql?query={ favoriteMarket { fm } }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     assert(response.type, 'text/html')
    //   })
  })
})
