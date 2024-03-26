const assert = require('assert')
const mock = require('egg-mock')

describe('test/app/graphql/platformProfit.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: '../../test/fixtures/apps/graphql-app'
    })
    return app.ready()
  })
  afterEach(mock.restore)
  it('should get graphiql platformProfit {members_seven_days_at yesterday_profit current_profit }', async() => {
    app.mockCsrf()
    const resp = await app.httpRequest()
      .get('/graphql?query={ platformProfit {members_seven_days_at yesterday_profit current_profit } }')
      .expect(200)

    const exp = {
      at_profit_rate: '001',
      current_profit: {
        lj: '001'
      },
      distributed: {
        lj: '001'
      },
      members_seven_days_at: '001',
      platform_seven_days_at: '001',
      total_at: 1,
      total_at_delivered: '001',
      total_profit: {
        lj: '001'
      },
      unit_at_profit: '001',
      yesterday_profit: {
        lj: '001'
      }
    }

    return assert(exp, resp.body.data)
    // return app.httpRequest()
    //   .get('/graphql?query={ platformProfit { platformProfit {members_seven_days_at yesterday_profit current_profit } }')
    //   .set('Accept', 'text/html')
    //   .expect(200)
    //   .then(response => {
    //     assert(response.type, 'text/html')
    //   })
  })
})
