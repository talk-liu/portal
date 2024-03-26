
module.exports = () => {
  const config = (exports = {})
  config.graphql = {
    router: '/graphql',
    app: true,
    agent: false,
    graphiql: false,
    async onPreGraphQL() { return null },
    async onPreGraphiQL() { return null }
  }

  config.switch = {
    type: 'http' // or rpc
  }

  config.transifexHash = 'transifex_hash:pre'
  config.optionOtcKey = 'optionOtc:pre'

  config.bannerKey = 'portal:pageConfig:banner:pre'
  config.announceKey = 'portal:pageConfig:announce:pre'
  config.autoGonPageConfig = [ 'portal:pageConfig:ieo_active:pre' ]
  config.routerProxyOptKey = 'portal_option_btcusd_day_call:pre'

  config.redis = {
    clients: {
      default: {
        port: 6379,
        password: '',
        db: 0,
        host: 'riostox-redis-excha.ai5ij7.ng.0001.apse1.cache.amazonaws.com'
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
        host: 'riostox-redis-excha.ai5ij7.ng.0001.apse1.cache.amazonaws.com'
      }
    }
  }
  config.isOptionAgreeRedisKey = 'portal-option-agree-member:pre'
  config.logger = {
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false
  }
  config.staticOptionHashKey = 'option:pageConfig:siteHash:pre'
  config.staticHashKey = 'portal:pageConfig:siteHash:pre'
  config.staticServer = '//s.riostox.com/portal/static'
  config.staticOptionServer = '//s.riostox.com/option/static'
  config.rootDomain = '//pre.riostox.com'
  config.mapiSpecialCfg = {
    key: 'fe6b08005afff75f45d944da574f222c',
    secret: '8312c931a5e92df7e80ccc2a852b187773370b1d22a57fe824db8191154a4ccb',
    baseUrl: 'https://pre-mapi.riostox.com'
  }

  config.napiSpecialCfg = {
    baseUrl: 'http://napi.in.riostox.com',
    originDomain: 'https://pre.riostox.com'
  }

  config.frontedSpecialCfg = {
    baseUrl: 'http://promotion.in.riostox.com'
  }

  config.exchangeFrontedSpecialCfg = {
    baseUrl: 'https://pre.riostox.com',
    apiBaseUrl: 'https://api.riostox.com',
    domain: '.riostox.com',
    baseAuth: {
      user: 'riostox-admin',
      password: 'aaabbb2134567'
    }
  }

  config.pusherSpecialCfg = {
    wsHost: 'push.riostox.com'
  }
  config.ieoSpecialConfig = {
    baseUrl: 'http://atvip.alb.in.riostox.com'
  }

  return config
}

