
module.exports = () => {
  const config = (exports = {})
  config.siteMapConfig = {
    siteMapKey: 'sitemap:prod',
    cacheTime: 60000 * 15 // 站点地图与robot.txt缓存时间
  }
  config.graphql = {
    router: '/graphql',
    app: true,
    agent: false,
    graphiql: false,
    introspection: process.env.NODE_ENV !== 'production',
    async onPreGraphQL() { return null },
    async onPreGraphiQL() { return null }
  }

  config.switch = {
    type: 'http' // or rpc
  }

  config.transifexHash = 'transifex_hash:pro'
  config.optionOtcKey = 'optionOtc:prod'


  config.routerProxyOptKey = 'portal_option_btcusd_day_call:prod'
  config.isOptionAgreeRedisKey = 'portal-option-agree-member:prod'
  config.redis = {
    clients: {
      default: {
        port: 6379,
        password: '',
        db: 0,
        host: 'riostox-redis-exchan.ai5ij7.ng.0001.apse1.cache.amazonaws.com'
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
        host: 'riostox-redis-exchan.ai5ij7.ng.0001.apse1.cache.amazonaws.com'
      }
    }
  }

  config.logger = {
    consoleLevel: 'DEBUG',
    disableConsoleAfterReady: false
  }
  config.staticOptionHashKey = 'option:pageConfig:siteHash:prod'
  config.staticHashKey = 'portal:pageConfig:siteHash:prod'
  config.staticServer = '//s.riostox.com/portal/static'
  config.staticOptionServer = '//s.riostox.com/option/static'
  config.rootDomain = '//riostox.com'
  config.mapiSpecialCfg = {
    key: 'fe6b08005afff75f45d944da574f222c',
    secret: '8312c931a5e92df7e80ccc2a852b187773370b1d22a57fe824db8191154a4ccb',
    baseUrl: 'https://mapi.riostox.com'
  }

  config.napiSpecialCfg = {
    baseUrl: 'http://napi.in.riostox.com',
    originDomain: 'https://riostox.com'
  }

  config.frontedSpecialCfg = {
    baseUrl: 'http://promotion.in.riostox.com'
  }

  config.exchangeFrontedSpecialCfg = {
    baseUrl: 'https://riostox.com',
    apiBaseUrl: 'https://api.riostox.com',
    domain: '.riostox.com'
  }

  config.pusherSpecialCfg = {
    wsHost: 'push.riostox.com'
  }

  config.ieoSpecialConfig = {
    baseUrl: 'http://atvip.alb.in.riostox.com'
  }
  return config
}
