module.exports = () => {
  const config = (exports = {})
  config.siteFile = {
    '/favicon.ico': 'https://i.riostox.com/favicon.ico'
  }
  config.siteMapConfig = {
    siteMapKey: 'sitemap:prod',
    cacheTime: 60000 * 15 // 站点地图与robot.txt缓存时间
  }
  config.graphql = {
    router: '/graphql',
    app: true,
    agent: false,
    graphiql: false,
    async onPreGraphQL() { return null },
    async onPreGraphiQL() { return null }
  }
  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: [ '*' ]
  }

  config.cors = {
    // origin: ctx => {
    //   const allowList = {
    //     '127.0.0.1:8080': 1
    //   }
    //   const { URL } = require('url')
    //   const origin = new URL(ctx.request.header.origin)
    //   if (allowList[origin.host]) {
    //     return origin.host
    //   }
    // },
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  }
  config.cluster = {
    listen: {
      port: 7009,
      hostname: '0.0.0.0'
    }
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
        host: '127.0.0.1'
      },
      portal: {
        port: 6379,
        password: '',
        db: 0,
        host: '127.0.0.1'
      },
      kline: {
        port: 6379,
        password: '',
        db: 1,
        host: '127.0.0.1'
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
    baseUrl: 'http://127.0.0.1:7003',
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
  // 本地开发需要获取登陆账号的 memberId 才可以本地登陆成功
  config.localDebug = {
    sessionId: 'd625a047a8f601f178e41a37349db145',
    memberId: 54// 278//
  }

  config.ieoSpecialConfig = {
    baseUrl: 'http://atvip.alb.in.riostox.com'
  }
  return config
}
