module.exports = () => {
  const config = (exports = {})
  config.graphql = {
    router: '/graphql',
    app: true,
    agent: false,
    graphiql: true,
    async onPreGraphQL() {
      return null
    },
    async onPreGraphiQL() {
      return null
    }
  }

  config.switch = {
    type: 'http' // or rpc
  }

  config.redis = {
    clients: {
      default: {
        port: 6379,
        password: '',
        db: 0,
        host: 'session.redis.riostox.com'
      },
      portal: {
        port: 6379,
        password: '',
        db: 0,
        host: 'portal.redis.riostox.com'
      },
      kline: {
        port: 6379,
        password: '',
        db: 1,
        // host: 'canary-riostox-redis-ex-001.drnbcf.0001.apse1.cache.amazonaws.com'
        host: 'session.redis.riostox.com'
      }
    }
  }

  config.logger = {
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false
  }
  config.staticOptionHashKey = 'option:pageConfig:siteHash:prod'
  config.staticHashKey = 'portal:pageConfig:siteHash:canary'
  // config.staticServer = '//s.riostox.com/portal/static'
  // config.staticOptionServer = '//s.riostox.com/option/static'
  config.staticServer = '//s.riostox.com/portal/static'
  config.staticOptionServer = '//s.riostox.com/option/static'
  config.rootDomain = '//riostox.com'
  config.mapiSpecialCfg = {
    key: '60744d6413b70eb9f4366478648848f2',
    secret: '1f30c7e75aab8c806d9873828b5fd4f0d375c515ad872655de27b7020823a7c1',
    // baseUrl: 'https://mapi.riostox.com'
    baseUrl: 'https://mapi.riostox.com'
  }

  config.napiSpecialCfg = {
    // baseUrl: 'http://napi.in.riostox.com',
    // originDomain: 'https://riostox.com'
    baseUrl: 'http://napi.in.riostox.com',
    originDomain: 'https://riostox.com'
  }

  config.frontedSpecialCfg = {
    // baseUrl: 'http://promotion.in.riostox.com'
    baseUrl: 'http://promotion.in.riostox.com'
  }

  config.exchangeFrontedSpecialCfg = {
    baseUrl: 'https://riostox.com',
    apiBaseUrl: 'https://api.riostox.com',
    domain: '.riostox.com',
    baseAuth: {
      user: 'riostox',
      password: 'aabbccc'
    }
  }

  config.pusherSpecialCfg = {
    wsHost: 'push.riostox.com'
  }

  config.ieoSpecialConfig = {
    baseUrl: 'http://atvip.alb.in.riostox-uat.com'
  }
  return config
}
