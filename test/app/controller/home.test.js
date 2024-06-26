

const { app, assert } = require('egg-mock/bootstrap')

describe('test/app/controller/home.test.js', () => {

  it('should assert', async function() {
    const pkg = require('../../../package.json')
    assert(app.config.keys.startsWith(pkg.name))

    // const ctx = app.mockContext({});
    // yield ctx.service.xx();
  })

  it('should GET /healthcheck', () => {
    return app.httpRequest()
      .get('/healthcheck')
      .expect(200)
  })
})
