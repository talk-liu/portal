
const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/computingPower.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql computingPower { count estimated blocks}', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ computingPower { count estimated blocks} }')
      .expect(200)

    const exp = {
      count: 4,
      estimated: 50,
      blocks:
        [
          { beu:
            { btc: '1.69526088',
              eth: '64.90517506999999999',
              usdt: '185294.56546281999952441' },
          key: 'riostox:bi:miningpower:2018-08-02:4',
          start_date: '2018-08-02T18:00:00.000+08:00',
          end_date: '2018-08-03T00:00:00.000+08:00' },
          { beu:
            { btc: '3.26936993',
              eth: '45.34106676',
              usdt: '184808.5754119500001309' },
          key: 'riostox:bi:miningpower:2018-08-03:1',
          start_date: '2018-08-03T00:00:00.000+08:00',
          end_date: '2018-08-03T06:00:00.000+08:00' },

          { beu:
            { btc: '1.01384531',
              eth: '48.71023727',
              usdt: '243926.99231574000008038' },
          key: 'riostox:bi:miningpower:2018-08-03:2',
          start_date: '2018-08-03T06:00:00.000+08:00',
          end_date: '2018-08-03T12:00:00.000+08:00' },

          { beu:
            { btc: '1.61331016',
              eth: '19.93515678',
              usdt: '108389.48424729000115008' },
          key: 'riostox:bi:miningpower:2018-08-03:3',
          start_date: '2018-08-03T12:00:00.000+08:00',
          end_date: '2018-08-03T18:00:00.000+08:00' }] }
    return assert(exp, resp.body.data)

    // return app.httpRequest()
    //   .get('/graphql?query={ computingPower { count estimated blocks} }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     console.log(response.body)
    //     assert(response.type, 'text/html')
    //   })
  })
})
