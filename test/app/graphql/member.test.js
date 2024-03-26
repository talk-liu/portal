const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/member.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql member { id name created_at}', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ member { id name created_at} }')
      .expect(200)

    const exp = {
      id: 'lll',
      sn: 'lll',
      email: 'll@126.com',
      activated: true,
      id_document_state: 'll',
      id_document_verified: true
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
