// const Agent = require('agentkeepalive')
module.exports = appInfo => {
  const config = exports = {}
  config.siteFile = {
    '/favicon.ico': 'https://i.riostox.com/favicon.ico'
  }
  config.siteMapConfig = {
    siteMapKey: 'sitemap',
    cacheTime: 1000 // 站点地图与robot.txt缓存时间
  }
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1528099505018_5831'
  config.sessionKey = '_session'
  // config.httpclient = {
  //   httpAgent: {
  //     timeout: 63000
  //   }
  // }
  config.requestModuleConfig = {
    // agent: new Agent({ // 第三方的request模块使用和curl一样的配置
    //   // 默认开启 http KeepAlive 功能
    //   keepAlive: true,
    //   // 空闲的 KeepAlive socket 最长可以存活 4 秒
    //   freeSocketTimeout: 4000,
    //   // 当 socket 超过 30 秒都没有任何活动，就会被当作超时处理掉
    //   timeout: 63000,
    //   // 允许创建的最大 socket 数
    //   maxSockets: Number.MAX_SAFE_INTEGER,
    //   // 最大空闲 socket 数
    //   maxFreeSockets: 256
    // })
  }
  config.proxy = true
  config.ipHeaders = 'x-forwarded-for'
  config.errorPage = 'https://riostox.com/error_pages/error.html'
  config.prepareData = [ 'member', 'optionMarket', 'optionTicker', 'appConfig', 'mMarket', 'captcha', 'challenge', 'currentIP', 'income', 'optionBalance', 'frontedCurrency' ]
  config.routerProxyOptKey = 'portal_option_btcusd_day_call'
  config.transifexHash = 'transifex_hash'
  config.napiSecret = 'S@ohSSGsj8Fi'
  config.optionOtcKey = 'optionOtc'
  config.voteCoin = 'portal:pageConfig:voteico'
  config.portalNewestMarkets = 'portal_newest_markets'
  config.ico = 'portal:pageConfig:ico'
  config.siteMap = 'portal:pageConfig:siteMap'
  config.adList = 'portal:pageConfig:adList'
  config.registerActive = 'portal:pageConfig:register_active'
  config.robots = 'portal:pageConfig:robots'
  config.news = 'portal:pageConfig:news'
  config.appConfig = 'portal:pageConfig:appConfig'
  config.candyAmount = 'portal:pageConfig:candy_amount'
  config.atTotalInfo = 'atTotalInfo'
  config.portalAllOptionMarket = 'portalAllOptionMarket'
  config.proMarkets = 'portal:proMarkets'
  config.fundsInterlocution = 'portal:pageConfig:fundsInterlocution'
  config.depositRemarksNew = 'portal:pageConfig:depositRemarksNew'
  config.downLineCoin = [ 'plat', 'soc', 'hand' ]
  config.mutationNoAcl = [ 'forgetPassword', 'forgetPasswordCode', 'forgetPsw', 'resetForgetPassword', 'redirect_path', 'signin', 'signup', 'twoFrontendFactor', 'authTwoFactor' ]

  config.bannerKey = 'portal:pageConfig:banner'
  config.announceKey = 'portal:pageConfig:announce'

  config.autoGonPageConfig = [ 'portal:pageConfig:ieo_active' ]// 将小二后台key自动注入gon变量 实现在helper.renderMultiInterface

  config.multipart = {
    mode: 'file',
    fileSize: '5mb',
    files: 10,
    fields: 20,
    whitelist: [ '.png', '.jpg', '.jpeg', '.gif', '.pdf' ]
  }

  // sendPulse
  config.sendConfig = {
    API_USER_ID: '928eecbd520f677cb573bd37265e5c1b',
    API_SECRET: '690abfbf48e8830c339cb6ec4bf76ad0',
    TOKEN_STORAGE: '/tmp/',
    LIST_Id: 2288878
  }

  // add your config here
  config.middleware = [
    'healthcheck',
    'channel',
    'currentMember',
    'ratelimit',
    'tradingView',
    'routerProxy',
    'authenticate',
    'response',
    'graphql'
  ]

  config.pusherCommonCfg = {
    key: '73b0202a5bb9d80e63cb',
    wsPort: '8080',
    wssPort: '443',
    encrypted: false
  }

  const ignorePath = [ '/graphql', '/sitemap.xml', '/robots.txt', '/portal', '/pusher/auth' ]
  config.forI18 = {
    ignore(ctx) {
      const path = ctx.request.path
      for (let i = 0; i < ignorePath.length; i++) {
        if (path.indexOf(ignorePath[i]) === 0) {
          return true
        }
      }
    }
  }

  config.whiteListRedisKey = 'portal-publicTest-whiteList'

  config.isOptionAgreeRedisKey = 'portal-option-agree-member'

  config.ratelimit = {
    duration: 60000,
    errorMessage: 'The frequency of your visit is too high, please be merciful!',
    headers: {
      remaining: 'Rate-Limit-Remaining',
      reset: 'Rate-Limit-Reset',
      total: 'Rate-Limit-Total'
    },
    max: 120,
    disableHeader: false
  }

  config.authenticate = {
    match: '/graphql'
  }

  config.tradingView = {
    match: '/portal/1.1'
  }

  const currentMemberMatch = [
    '/portal', '/graphql', '/option', '/pusher/auth',
    '/history/trades.csv', '/history/orders.csv',
    '/portal/user/document',
    '/portal/1.1/study_templates'
  ]
  config.currentMember = {
    // match: '/graphql'
    match(ctx) {
      const path = ctx.request.path
      for (const match of currentMemberMatch) {
        if (path.indexOf(match) === 0) {
          return true
        }
      }
    }
  }

  config.graphqlAcl = [
    'voucher',
    'order',
    'bid',
    'ask',
    'account',
    'favoriteMarket',
    'income',
    'isMiner',
    'cancelOrder',
    'clearOrder',
    'voteCoinHistory',
    'orderHistory',
    'order24hHistory',
    'optionBalance',
    'optionTrade',
    'optionOrder',
    'optionExerciseDetail',
    'optionFundsTransfersHistory',
    'optionTransfersHistory',
    'optionAccount',
    'optionPositionAccount',
    'optionOrderDetail',
    'optionTransfer',
    'optionCancelOrder',
    'optionClearOrder',
    'optionCreateOrder',
    'transfer',
    'condition',
    'optionUserAuthenticate',
    'optionPermission',
    'withdrawAddress',
    'fdt',
    'optionPermission',
    'newOtc',
    'historyTrade',
    'tradingView',
    'proxyAuth',
    'message',
    'apiToken',
    'userSigninWithAcl',
    'pusherAuth',
    'atGame'

  ]

  config.lang = {
    en: [ 'en-US', 'en-us', 'en', 'en-GB', 'en-gb', 'en-AU', 'en-au' ],
    'zh-CN': [ 'zh', 'zh-SW', 'zh-sw', 'zh-CN', 'zh-cn' ],
    'zh-TW': [
      'zh-TW',
      'zh-tw',
      'zh-SG',
      'zh-sg',
      'zh-HK',
      'zh-hk',
      'zh-MO',
      'zh-mo'
    ],
    ru: [ 'ru_RU', 'ru_ru', 'ru', 'RU' ],
    ko: [ 'ko', 'KO' ],
    vi: [ 'vi', 'VI' ],
    tr: [ 'tr', 'TR' ],
    es: [ 'es' ]
  }

  const csrf_ignores = [ '/portal/1.1', '/pusher/auth', '/portal/1.1/study_templates' ]
  config.security = {
    csrf: {
      enable: true,
      headerName: 'x-csrf-token',
      ignore: ctx => csrf_ignores.indexOf(ctx.request.path) >= 0
        || ctx.get('origin') === 'https://rus.riostox.com' || ctx.get('origin') === 'https://riostox.marketing' || ctx.get('origin') === 'https://www.riostox.marketing' || ctx.get('origin') === 'https://rus.riostox.com'
    },
    // csp: {
    //   enable: false,
    //   headerName: 'Content-Security-Policy',
    //   policy: {
    //     'default-src': '\'self\'',
    //     'script-src': [
    //       '\'self\'',
    //       'https://*.riostox.com',
    //       'https://*.riostox.com',
    //       'https://*.pre.riostox.com',
    //       'https://rus.riostox.com',
    //       'https://riostox.marketing',
    //       'https://riostox.marketing',
    //       'https://rus.riostox.com',
    //       'https://*.yunpian.com',
    //       'https://*.googletagmanager.com',
    //       'https://www.google.com',
    //       '\'nonce-4c6530eeec6dc7840c6f19265937d21433318c6543e47bfa8601209b4f3c4426\'',
    //       '\'nonce-c72d3441f9280d6293fe738446481318ddd2c355108aa73946f6c1448deae15d\'',
    //       '\'nonce-8c8d9cb2050f3b966a7c1b7c02f197c511e9718bfe5aaac2a332448072eebc6c\''
    //     ],
    //     'font-src': [ '\'self\'',
    //       'https://fonts.gstatic.com',
    //       'data:',
    //       'https://*.riostox.com',
    //       'https://*.riostox.com',
    //       'https://*.pre.riostox.com' ],
    //     'connect-src': [ '\'self\'', 'wss://push.riostox.com', 'https://sockjs.pusher.com' ],
    //     'img-src': [ '\'self\'',
    //       'data:',
    //       'https://*.riostox.com',
    //       'https://*.riostox.com',
    //       'https://*.pre.riostox.com',
    //       'https://*.yunpian.com'
    //     ],
    //     'style-src': [
    //       '\'self\'',
    //       'unsafe-inline',
    //       'https://*.riostox.com',
    //       'https://*.riostox.com',
    //       'https://*.pre.riostox.com'
    //     ]
    //   }
    // },
    domainWhiteList: [ 'riostox.com', 'riostox.com', 'pre.riostox.com', 'rus.riostox.com', 'riostox.marketing', 'www.riostox.marketing',
      'rus.riostox.com',
      '.yunpian.com',
      '.googletagmanager.com' ]
  }

  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks'
    }
  }

  config.i18n = {
    defaultLocale: 'en-US',
    queryField: 'locale',
    cookieField: 'locale',
    cookieMaxAge: '1y'
  }

  // cors
  config.cors = {
    // origin: ctx => {
    //   const allowList = {
    //     'riostox.com': 1,
    //     'riostox.com': 1,
    //     'pre.riostox.com': 1,
    //     'riostox.marketing': 1
    //   }
    //   const { URL } = require('url')
    //   const origin = new URL(ctx.request.header.origin)
    //   if (allowList[origin.host]) {
    //     return origin.host
    //   }
    // },
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    maxAge: '600'
  }

  // 火币汇率
  config.huobiCfg = {
    baseUrl: 'https://www.hbg.com',
    urls: {
      optionOtc: {
        get: {
          method: 'GET',
          url: '/-/x/general/exchange_rate/list',
          params: []
        }
      }
    }
  }
  // atvip 接口
  config.ieoCfg = {
    urls: {
      ieo: {
        submitOrder: {
          method: 'POST',
          url: '/v1/ieoOrder/save',
          params: [ 'ieoCode', 'currency', 'memberId', 'buyAmount', 'currencyAmount', 'rewardAmount', 'rewardRate' ]
        },
        ieoInfo: {
          method: 'POST',
          url: '/v1/ieo/info',
          params: [ 'ieoCode' ]
        },
        orderList: {
          method: 'POST',
          url: '/v1/ieoOrder/list',
          params: [ 'ieoCode', 'memberId', 'number', 'size' ]
        }
      }
    }
  }

  config.mapiCommonCfg = {
    platform: 'web',
    urls: {
      refreshToken: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/refresh_token',
          params: [ 'member_id', 'session_id' ]
        }
      },
      token: {
        method: 'POST',
        url: '/api/mobile/v1/auth_token',
        params: [ 'refresh_token' ]
      },
      pusherAuth: {
        post: {
          method: 'POST',
          url: '/api/mobile/v1/pusher/auth',
          params: [ 'socket_id', 'channel_name' ]
        }
      },
      session: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/frontend/timestamp',
          params: []
        }
      },
      userSignin: {
        signin: {
          method: 'POST',
          url: '/api/mobile/v1/frontend/signin',
          params: [ 'session_id', 'email', 'password', 'id_type', 'id_value', 'token' ]
        },
        signup: {
          method: 'POST',
          url: '/api/mobile/v1/frontend/signup',
          params: [ 'session_id', 'email', 'password', 'password_confirmation', 'utm_source', 'utm_medium', 'aff', 'id_type', 'id_value', 'token' ]
        },
        twoFrontendFactor: {
          method: 'POST',
          url: '/api/mobile/v1/frontend/two_factors',
          params: [ 'session_id', 'type', 'refresh' ]
        },
        authTwoFactor: {
          method: 'POST',
          url: '/api/mobile/v1/frontend/auth/two_factors',
          params: [ 'session_id', 'email', 'otp', 'type' ]
        }
      },
      userSigninWithAcl: {
        signout: {
          method: 'POST',
          url: '/api/mobile/v1/frontend/logout',
          params: [ 'session_id' ]
        },
        activationEmail: {
          method: 'POST',
          url: '/api/mobile/v1/activation_email',
          params: [ 'email' ]
        },
        activate: {
          method: 'POST',
          url: '/api/mobile/v1/activate',
          params: [ 'code' ]
        }
      },
      depth: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/depth',
          params: [ 'market' ]
        }
      },
      redirect_path: {
        update: {
          method: 'POST',
          url: '/api/mobile/v1/redirect_path',
          params: [ 'session_id', 'path' ]
        }
      },
      historyTrade: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/history/trades',
          params: [ 'order_id', 'from', 'to', 'market', 'bu', 'qu', 'page', 'page_size' ]
        }
      },
      optionPermission: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/option_permissions',
          params: []
        }
      },
      deliveryCurrency: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/delivery_currencies',
          params: []
        },
        cache: {
          time: 60 * 5
        }
      },
      member: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/current_user',
          params: []
        },
        verify: {
          method: 'POST',
          url: '/api/mobile/v1/verify_two_factor',
          params: [ 'auth_action', 'type', 'email', 'country', 'phone_number', 'password' ]
        },
        faceppVerify: {
          method: 'POST',
          url: '/api/mobile/v1/facepp_verify',
          params: []
        },
        document: {
          method: 'POST',
          url: '/api/mobile/v1/id_documents',
          params: [ 'token', 'id_document_type', 'first_name', 'last_name', 'phone', 'country_code', 'country', 'id_document_number', 'primary_id_document_file_attributes', 'secondary_id_document_file_attributes', 'selfie_id_document_file_attributes', 'name', 'gender', 'birth_date', 'address', 'city', 'zipcode' ],
          excludeSignature: [ 'primary_id_document_file_attributes', 'secondary_id_document_file_attributes', 'selfie_id_document_file_attributes' ],
          isFormData: true
        },
        historyMining: {
          method: 'GET',
          url: '/api/mobile/v1/history/minings',
          params: [ 'page_size', 'page' ]
        },
        historyProfits: {
          method: 'GET',
          url: '/api/mobile/v1/history/profits',
          params: [ 'page_size', 'page' ]
        }
      },
      captcha: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/captcha',
          params: []
        }
      },
      challenge: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/captcha/geetest_challenge',
          params: []
        }
      },
      condition: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/condition_orders/current',
          params: [ 'page', 'page_size', 'market_code', 'begin_time', 'end_time', 'condition_type' ]
        },
        getAll: {
          method: 'GET',
          url: '/api/mobile/v1/condition_orders/history',
          params: [ 'page', 'page_size', 'market_code', 'begin_time', 'end_time', 'condition_type' ]
        },
        create: {
          method: 'POST',
          url: '/api/mobile/v1/condition_orders',
          params: [ 'direction', 'trigger_price', 'volume', 'condition_type', 'side', 'market', 'price', 'ord_type' ]
        },
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/condition_orders/cancel',
          params: [ 'id' ]
        },
        clear: {
          method: 'POST',
          url: '/api/mobile/v1/condition_orders/clear',
          params: []
        }
      },
      frontedCurrency: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/frontend/currencies',
          params: []
        }
      },
      order: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/history/orders',
          params: [ 'from', 'to', 'market', 'bu', 'qu', 'page', 'page_size', 'side', 'state', 'no_canceled', 'no_wait', 'with_trades' ]
        }
      },
      cancelOrder: {
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/orders/cancel',
          params: [ 'id' ]
        }
      },
      clearOrder: {
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/orders/clear',
          params: [ 'side' ]
        }
      },
      bid: {
        update: {
          method: 'POST',
          url: '/api/mobile/v1/order_bids',
          params: [ 'market', 'volume', 'price', 'ord_type', 'percent' ]
        }
      },
      ask: {
        update: {
          method: 'POST',
          url: '/api/mobile/v1/order_asks',
          params: [ 'market', 'volume', 'price', 'ord_type', 'percent' ]
        }
      },
      account: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/frontend/accounts',
          params: [ 'market' ]
        }
      },
      voucher: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/member_vouchers',
          params: []
        },
        historyVoucher: {
          method: 'GET',
          url: '/api/mobile/v1/history_vouchers',
          params: [ 'page_size', 'page' ]
        },
        inactiveVoucher: {
          method: 'GET',
          url: '/api/mobile/v1/inactive_vouchers',
          params: []
        }
      },
      trade: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/frontend/trades',
          params: [ 'market', 'limit' ]
        }
      },
      apiToken: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/api_tokens',
          params: []
        },
        post: {
          method: 'POST',
          url: '/api/mobile/v1/api_tokens',
          params: [ 'label', 'otp', 'type' ]
        },
        update: {
          method: 'POST',
          url: '/api/mobile/v1/update_api_tokens',
          params: [ 'ip_whitelist', 'otp', 'type', 'id' ]
        },
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/delete_api_token',
          params: [ 'id' ]
        }
      },

      // historyTrade: {
      //   get: {
      //     method: 'GET',
      //     url: '/api/mobile/v1/history/trades',
      //     params: [ 'order_id', 'from', 'to', 'market', 'bu', 'qu', 'page', 'page_size' ]
      //   }
      // },
      fdt: {
        // 获取国家
        countries: {
          method: 'GET',
          url: '/api/mobile/v1/fdt/countries',
          params: []
        },
        bank: {
          method: 'GET',
          url: '/api/mobile/v1/fdt/party-bank',
          params: []
        },
        banks: {
          method: 'GET',
          url: '/api/mobile/v1/fdt/banks',
          params: [ 'swift_code', 'name' ]
        },
        bankCards: {
          method: 'POST',
          url: '/api/mobile/v1/bank_cards',
          params: [ 'fdt_bank_id', 'account_number', 'fdt_country_id', 'city', 'state_province', 'postal_code', 'address1', 'address2', 'relationship' ]
        },
        bankGet: {
          method: 'GET',
          url: '/api/mobile/v1/bank_cards',
          // type 暂时未用方便后面拓展
          params: [ 'type' ]
        },
        depositList: {
          method: 'GET',
          url: '/api/mobile/v1/bank_cards/deposit_list',
          params: []
        },
        withdrawList: {
          method: 'GET',
          url: '/api/mobile/v1/bank_cards/withdraw_list',
          params: []
        },
        bankWires: {
          method: 'POST',
          url: '/api/mobile/v1/bank_wires',
          params: [ 'bank_card_id', 'source_of_funds', 'amount' ]
        },
        bankWiresGet: {
          method: 'GET',
          url: '/api/mobile/v1/bank_wires/detail',
          params: [ 'id' ]
        },
        bankWiresList: {
          method: 'GET',
          url: '/api/mobile/v1/bank_wires',
          params: []
        },
        // 法币提款
        fiat: {
          method: 'POST',
          url: '/api/mobile/v1/withdraws/fiat',
          params: [ 'currency', 'bank_card_id', 'sum', 'memo', 'otp', 'type' ]
        }


      },
      withdrawAddress: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/account/withdraw_addresses',
          params: []
        },
        depositHistory: {
          method: 'GET',
          url: '/api/mobile/v1/account/deposits',
          params: [ 'type', 'page', 'page_size' ]
        },
        applicants: {
          method: 'POST',
          url: '/api/mobile/v1/id_documents',
          params: [ 'birth_date', 'first_name', 'last_name', 'country', 'city', 'zipcode', 'address' ]
        },
        sdkTokenKyc: {
          method: 'POST',
          url: '/api/mobile/v1/id_documents/onfido_token',
          params: []
        },
        checkKyc: {
          method: 'POST',
          url: '/api/mobile/v1/id_documents/onfido_check',
          params: []
        },
        withdrawsHistory: {
          method: 'GET',
          url: '/api/mobile/v1/account/withdraws',
          params: [ 'page', 'page_size' ]
        },
        accountTransferHistory: {
          method: 'GET',
          url: '/api/mobile/v1/history/transfers',
          params: [ 'page', 'page_size' ]
        },
        resend: {
          method: 'POST',
          url: '/api/mobile/v1/withdraws/resend',
          params: [ 'id' ]
        },
        verify: {
          method: 'POST',
          url: '/api/mobile/v1/withdraws/verify',
          params: [ 'code', 'id' ]
        },
        create: {
          method: 'POST',
          url: '/api/mobile/v1/withdraws/create',
          params: [ 'currency', 'fund_uid', 'sum', 'memo', 'otp', 'type' ]
        },
        deleteAddress: {
          method: 'POST',
          url: '/api/mobile/v1/account/withdraw_addresses/delete',
          params: [ 'id' ]
        },
        depositAddress: {
          method: 'GET',
          url: '/api/mobile/v1/deposit_address',
          params: [ 'currency' ]
        },
        createAddress: {
          method: 'POST',
          url: '/api/mobile/v1/account/withdraw_addresses/create',
          params: [ 'currency', 'extra', 'uid' ]
        },
        me: {
          method: 'GET',
          url: '/api/mobile/v1/account/me',
          params: []
        },
        atVipGrade: {
          method: 'GET',
          url: '/api/mobile/v1/account/at_vip_grade',
          params: []
        },
        vipLevel: {
          method: 'GET',
          url: '/api/mobile/v1/account/vip_level',
          params: []
        }
      },
      atGame: {
        atGameTaskList: {
          method: 'POST',
          url: '/api/mobile/v1/at_game/member_task_list',
          params: [ 'number', 'size' ]
        },
        atGameRewardHis: {
          method: 'POST',
          url: '/api/mobile/v1/at_game/member_reward_list',
          params: [ 'number', 'size' ]
        }
      },
      message: {
        factor: {
          method: 'POST',
          url: '/api/mobile/v1/two_factors',
          params: [ 'type', 'refresh' ]
        },
        confirmFactor: {
          method: 'POST',
          url: '/api/mobile/v1/confirm_two_factor',
          params: [ 'otp', 'type', 'auth_action', 'password' ]
        },
        appFactor: {
          method: 'POST',
          url: '/api/mobile/v1/app_two_factor',
          params: [ 'otp', 'auth_action', 'password' ]
        },
        appFactorOtp: {
          method: 'POST',
          url: '/api/mobile/v1/app_two_factor_otp',
          params: []
        },
        resetPassword: {
          method: 'POST',
          url: '/api/mobile/v1/reset_password',
          params: [ 'otp', 'type', 'old_password', 'password', 'password_confirmation' ]
        },
        documentSms: {
          method: 'POST',
          url: '/api/mobile/v1/id_document/sms',
          params: [ 'phone', 'country_code' ]
        }
      },
      forget: {
        forgetPassword: {
          method: 'POST',
          url: '/api/mobile/v1/forget_password',
          params: [ 'email', 'token', 'id_value', 'id_type' ]
        },
        forgetPasswordCode: {
          method: 'POST',
          url: '/api/mobile/v1/forget_password_code_email',
          params: [ 'email', 'code' ]
        },
        forgetPsw: {
          method: 'POST',
          url: '/api/mobile/v1/forget_psw_2fa',
          params: [ 'code', 'type', 'email', 'refresh' ]
        },
        resetForgetPassword: {
          method: 'POST',
          url: '/api/mobile/v1/reset_forget_password_email',
          params: [ 'email', 'code', 'type', 'otp', 'password' ]
        }
      },
      favoriteMarket: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/favorite_markets',
          params: []
        },
        update: {
          method: 'POST',
          url: '/api/mobile/v1/like_market',
          params: [ 'market_id' ]
        },
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/dislike_market',
          params: [ 'market_id' ]
        }
      },
      computingPower: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/computing_power',
          params: []
        }
      },
      income: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/mining/my_mining',
          params: []
        }
      },
      platformProfit: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/mining/platform_profit',
          params: []
        }
      },
      market: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/tickers',
          params: []
        }
      },
      mMarket: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/markets',
          params: []
        }
      },
      ticker: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/tickers',
          params: []
        }
      },
      optionTicker: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/tickers',
          params: []
        }
      },
      kline: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/multi_k',
          params: [ 'markets', 'limit', 'period', 'to', 'timestamp' ]
        }
      },
      singleKLine: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/kline',
          params: [ 'market', 'limit', 'period', 'to', 'timestamp' ]
        }
      },
      otc: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/otc',
          params: []
        }
      },
      newOtc: {
        getOne: {
          method: 'GET',
          url: '/api/mobile/v1/otc/payment_order',
          params: [ 'payment_id' ]
        },
        getAll: {
          method: 'GET',
          url: '/api/mobile/v1/otc/payment_orders',
          params: [ 'page', 'page_size', 'state' ]
        },
        getQuote: {
          method: 'GET',
          url: '/api/mobile/v1/otc/quote',
          params: [ 'digital_currency', 'fiat_currency', 'requested_currency', 'requested_amount' ]
        },
        create: {
          method: 'POST',
          url: '/api/mobile/v1/otc/payment_orders',
          params: [ 'quote_id' ]
        }
      },
      optionPriceIndex: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/price_indexes',
          params: [
            'start',
            'end',
            'period',
            'code'
          ],
          cache: {
            time: 5
          }
        }
      },
      allCurrency: {
        get: {
          url: '/api/mobile/v1/site_config/general',
          method: 'GET',
          params: []
        }
      },
      optionOrder: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/orders',
          params: [
            'page',
            'side',
            'start_time',
            'end_time',
            'market_code',
            'state',
            'order_by',
            'direction',
            'page_size'
          ]
        }
      },
      optionCancelOrder: {
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/option/order/cancel',
          params: [ 'id' ]
        },
        whiteListCheck: true
      },
      optionClearOrder: {
        delete: {
          method: 'POST',
          url: '/api/mobile/v1/option/orders/clear',
          params: []
        },
        whiteListCheck: true
      },
      optionCreateOrder: {
        add: {
          method: 'POST',
          url: '/api/mobile/v1/option/orders',
          params: [ 'market_code', 'side', 'volume', 'price', 'ord_type' ]
        },
        whiteListCheck: true
      },
      optionTransfer: {
        update: {
          method: 'POST',
          url: '/api/mobile/v1/option/transfers',
          params: [ 'currency_code', 'to_account', 'from_account', 'amount' ]
        }
      },
      optionExerciseDetail: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/exercise_details',
          params: [ 'direction', 'page', 'page_size' ]
        }
      },
      optionAccount: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/option_accounts',
          params: [ 'currency_code' ]
        }
      },
      optionContractsHistory: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/contracts',
          params: [ 'direction', 'page', 'page_size', 'state', 'delivery_currency_codes' ],
          restriction: {
            state: 'not_start,ongoing,closed,can_check,checked,canceled'
          }
        }
      },
      optionCurrencies: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/currencies',
          params: []
        }
      },
      optionContractsStat: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/contracts_stat',
          params: []
        }
      },
      optionDepth: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/depth',
          params: [ 'market_code', 'limit' ]
        }
      },
      optionFundsTransfersHistory: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/funds/transfers',
          params: [ 'direction', 'page', 'per_page' ]
        }
      },
      optionHistoryTrade: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/trades',
          params: [ 'market_code', 'start_time', 'end_time', 'direction', 'page', 'page_size', 'start_id', 'end_id' ]
        }
      },
      optionKLineByCode: {
        get: {
          method: 'GET',
          url: 'api/mobile/v1/option/kline',
          params: [
            'period',
            'limit',
            'start_time',
            'end_time',
            'market_code' ]
        }
      },
      optionKLineByCodes: {
        get: {
          method: 'GET',
          url: 'api/mobile/v1/option/klines',
          params: [
            'period',
            'limit',
            'start_time',
            'end_time',
            'market_codes' ]
        }
      },
      optionPenddingKLine: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/kline/with_pending_trade',
          params: [
            'period',
            'limit',
            'trade_id',
            'start_time',
            'end_time',
            'market_code' ]
        }
      },
      optionBalance: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/account/balances',
          params: []
        }
      },
      optionMarket: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/markets',
          params: [ 'state', 'visible' ]
        }
        // cache: {
        //   time: (60 * 60) * 2 // 六十分钟 * 2
        // }
      },
      optionOrderDetail: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/order',
          params: [ 'id' ]
        }
      },
      optionPositionAccount: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/position_accounts',
          params: []
        }
      },
      optionTrade: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/members/trades',
          params: [ 'start_time', 'end_time', 'page', 'direction', 'page_size', 'market_code', 'start_id', 'end_id', 'order_id' ]
        }
      },
      optionTransfersHistory: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/option/transfers',
          params: [ 'page', 'direction', 'page_size' ]
        }
      },
      registerGeetest: {
        get: {
          method: 'GET',
          url: '/api/mobile/v1/geetest_token',
          params: []
        }
      }
    }
  }

  config.frontedCommonCfg = {
    urls: {
      isMiner: {
        method: 'GET',
        url: '/api/v1/auth/mining-member',
        params: [ 'security', 'uid' ]
      }
    }
  }

  config.napiCommonCfg = {
    urls: {
      atTotalInfo: {
        get: {
          method: 'GET',
          url: '/portal/atTotalInfo',
          params: [ 'timestamp' ]
        }
      },
      tradingView: {
        get: {
          method: 'GET',
          url: '/portal/tradingView',
          params: [ 'clientId', 'userId', 'template' ]
        },
        add: {
          method: 'POST',
          url: '/portal/tradingView',
          params: [ 'clientId', 'userId', 'name', 'content' ]
        },
        delete: {
          method: 'POST',
          url: '/portal/tradingView/del',
          params: [ 'clientId', 'userId', 'template' ]
        }
      },
      lastSevenAtAward: {
        get: {
          method: 'GET',
          url: '/portal/lastSevenAtAward',
          params: []
        }
      },
      lastSevenAtMiningAward: {
        get: {
          method: 'GET',
          url: '/portal/lastSevenAtMiningAward',
          params: []
        }
      },
      optionUserAuthenticate: {
        get: {
          method: 'GET',
          url: '/option/agree/:uid/:secret', // 查询用户是否同意过协议
          params: []
        },
        update: {
          method: 'GET',
          url: '/option/set/agree/:uid/:secret', // 设置用户同意协议
          params: []
        }
      },
      voteCoin: {
        get: {
          method: 'GET',
          url: '/vote_history/:uid/:secret',
          params: []
        }
      },
      voteCoinHistory: {
        get: {
          method: 'GET',
          url: '/vote_reward_history/:uid/:secret',
          params: []
        }
      },
      allMarkets: {// napi中查询数据库中所有交易对
        get: {
          method: 'GET',
          url: '/markets/:secret',
          params: []
        }
      },
      voteCount: {
        get: {
          method: 'GET',
          url: '/vote_count/:period',
          params: []
        }
      },
      proxyAuth: {
        post: {
          method: 'POST',
          url: '/proxy/auth',
          params: [ 'forwardName', 'uid', 'secret' ]
        }
      }
    }
  }

  config.exchangeFrontedCommonCfg = {
    urls: {
      orderHistory: {
        get: {
          method: 'GET',
          url: '/history/orders.json',
          params: [ 'state', 'per_page' ]
        }
      },
      order24hHistory: {
        get: {
          method: 'GET',
          url: '/history/orders24h.json',
          params: [ 'per_page' ]
        }
      },
      pendingKLine: {
        get: {
          method: 'GET',
          url: '/api/v2/k_with_pending_trades.json',
          params: [ 'market', 'limit', 'period', '_t', 'trade_id' ]
        }
      },
      depth: {
        get: {
          method: 'GET',
          url: '/api/v2/depth.json',
          params: [ 'market' ]
        }
      }
    }
  }

  config.geetest = {
    urls: {
      registerGeetest: {
        method: 'GET',
        url: '/api/mobile/v1/geetest_token',
        params: []
      }
    }
  }


  return config
}
