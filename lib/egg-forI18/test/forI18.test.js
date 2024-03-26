'use strict';

const mock = require('egg-mock');

describe('test/forI18.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/forI18-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, forI18')
      .expect(200);
  });
});
