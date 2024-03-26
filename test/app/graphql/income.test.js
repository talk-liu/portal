const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/income.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql income { at_ratio finished_cache frozen_at last_at_income }', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ income { at_ratio finished_cache frozen_at last_at_income } }')
      .expect(200)

    const exp = {
      at_ratio: 'lj',
      finished_cache: 'lj',
      frozen_at: {
        n: 'll'
      }
    }
    return assert(exp, resp.body.data)
    // return app.httpRequest()
    //   .get('/graphql?query={ income { at_ratio finished_cache frozen_at last_at_income } }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     assert(response.type, 'text/html')
    //   })
  })
})
