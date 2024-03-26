const mocks = require('../../mockData/index')
const moment = require('moment')
require('moment-timezone')
const _ = require('lodash')
const cache = require('memory-cache')
const proMarkets = require('../../config/locale/en-US.json')
const limitList = require('../../limitOption')
const limitListTech = require('../../limitOption-tech')
const url = require('url')
const langList = [
  { local: 'en' },
  { local: 'zh-CN' },
  { local: 'zh-TW' },
  { local: 'ru' },
  { local: 'ko' },
  { local: 'vi' },
  { local: 'tr' },
  { local: 'es' }
]

const limitUserIds = _.map(limitList, ({ member_id }) => {
  return member_id
})
const limitUserIdsTech = _.map(limitListTech, ({ member_id }) => {
  return member_id
})

function find(str, cha, num) {
  let x = str.indexOf(cha)
  for (let i = 0; i < num; i++) {
    x = str.indexOf(cha, x + 1)
  }
  return x > 0 ? str.slice(x) : ''
}


module.exports = {
  alog(...msg) {
    const apiLog = !!this.ctx.request.query.api_log
    apiLog && this.ctx.logger.debug(...msg)
  },
  mock(key) {
    return mocks[key]
  },
  envSessionId() {
    return this.app.config.localDebug ? this.app.config.localDebug.sessionId : null
  },
  envMemberId() {
    return this.app.config.localDebug ? this.app.config.localDebug.memberId : null
  },
  newrelicScript() {
    return this.app.locals.newrelic ? this.app.locals.newrelic.getBrowserTimingHeader() : ''
  },
  async renderTVScript() {
    const env = this.app.config.env === 'pre' ? ':pre' : ''
    const tvVersionOpt = await this.app.redis.get('portal').get(`portal:pageConfig:tvVersion${env}`) || '{}'
    const tvVersion = JSON.parse(tvVersionOpt)
    const tradingviewScript = `<script type="text/javascript" src="${this.app.config.rootDomain}/charting_library/charting_library.min.js?tvVersion=${tvVersion.version}"></script>`
    return tradingviewScript
  },
  renderSeoLink() {
    const { ctx } = this
    const path = ctx.request.path
    const lang = ctx.app.config.lang
    const truePath = find(path, '/', 1)
    let res = ''
    for (const i in lang) {
      res += `<link rel="alternate" hreflang="${i}" href="https://riostox.com/${i}${truePath}" />\n`
    }

    res += `<link rel="canonical" href="https://riostox.com/${this.ctx.getLang() || 'en'}${truePath}" />\n`
    return res
  },

  async renderPusher() {
    let pusher = {}
    _.merge(pusher, this.app.config.pusherCommonCfg)
    pusher.wsHost = this.app.config.pusherSpecialCfg.wsHost
    pusher = JSON.stringify(pusher)
    return pusher
  },
  async renderMultiInterface() {
    let temp
    await this.ctx.getCurrentMemberId()
    const gon = {}
    const uid = this.ctx.currentMemberId
    // this.ctx.logger.debug('renderMultiInterface uid is : ', uid)
    const defaultRedis = this.app.redis.get('portal')
    const categories = this.app.config.prepareData
    for (let i = 0; i < categories.length; i++) {
      if (categories[i] === 'currentIP') {
        if (this.ctx.app.config.env === 'local') {
          gon.current_ip = JSON.stringify({ ip: '127.0.0.1' })
        } else {
          temp = this.ctx.ip
          // this.ctx.logger.debug(`renderMultiInterface portal-${categories[i]} ip : `, temp, ' : ', typeof temp)
          try {
            gon.current_ip = JSON.stringify({ ip: temp[0] })
          } catch (err) {
            // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
            gon.current_ip = 'null'
          }
        }
        continue
      }
      if (categories[i] === 'captcha') {
        try {
          temp = await this.ctx.service.member.captcha()
          gon.captcha = JSON.stringify(temp)
        } catch (err) {
          // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
          gon[categories[i]] = 'null'
        }
        continue
      }
      if (categories[i] === 'appConfig') {
        try {
          temp = await this.ctx.service.icoAndOp.get()
          if (!_.isObject(temp)) {
            throw new Error('gon appConfig return not a object')
          }
          if (_.isUndefined(temp.appConfig)) {
            throw new Error('gon appConfig return not has appConfig')
          }
          gon.appConfig = JSON.stringify(temp.appConfig)
        } catch (err) {
          // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
          gon[categories[i]] = 'null'
        }
        continue
      }
      if (this.app.config.mapiCommonCfg.urls[categories[i]].get.params.length < 1) {
        if (categories[i] === 'member') {
          let member,
            me
          if (!uid) {
            member = ''
            // this.ctx.logger.debug('renderMultiInterface uid is null')
          } else {
            const redisMember = null // = await defaultRedis.get(`portal-member-${uid}`)
            // this.ctx.logger.debug('renderMultiInterface redisMember is : ', redisMember)
            if (!redisMember || redisMember.activated !== true) {
              let ifLogin
              try {
                ifLogin = await this.ctx.service.member.get()
                me = await this.ctx.service.depositAndWithDraw.me()
                if (_.isUndefined(me.result.latest_histories)) {
                  ifLogin.latest_histories = 'null'
                } else {
                  ifLogin.latest_histories = me.result.latest_histories
                }
                if (_.isUndefined(me.result.two_factors)) {
                  ifLogin.two_factors = 'null'
                } else {
                  ifLogin.two_factors = me.result.two_factors
                }
                member = JSON.stringify(ifLogin)
                await defaultRedis.set(`portal-member-${uid}`, member, 'EX', 60)
                // this.ctx.logger.debug('renderMultiInterface member insert redis')
              } catch (err) {
                this.ctx.logger.error('renderMultiInterface portal-member error', err)
                member = ''
              }
            } else {
              member = redisMember
            }
          }
          if (!member) { member = 'null' }
          gon.member = member
          continue
        }
        try {
          temp = await this.ctx.service.generalRequest.request({}, { method: 'get' }, categories[i])
          gon[categories[i]] = JSON.stringify(temp)
        } catch (err) {
          // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
          gon[categories[i]] = 'null'
        }
        continue
      }
      switch (categories[i]) {
        case 'optionMarket': {
          try {
            temp = await this.ctx.service.optionMarket.get({ visible: true, ifSorted: false })
            if (!_.isArray(temp)) {
              throw new Error('gon optionMarket return not a array')
            }
            // 时间优先、涨跌、币种
            gon.optionMarket = JSON.stringify(temp)
            // 先排稳定币、再排项目方币种
            // 币种排序后再按时间、小时、天排序
            // 小时盘中按分的大小排序
            temp = await this.ctx.service.optionMarket.get({ visible: true, ifSorted: true })
            gon.sortedOptionMarket = JSON.stringify(temp)
          } catch (err) {
            // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
            gon.optionMarket = 'null'
            gon.sortedOptionMarket = 'null'
          }
        }
        // no-fallthrough
        case 'mMarket': {
          try {
            temp = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'mMarket')
            if (!_.isArray(temp)) {
              throw new Error('gon mMarket return not a array')
            }
            gon.markets = JSON.stringify(temp)
          } catch (err) {
            // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
            gon.markets = 'null'
          }
        }
        // no-fallthrough
        // case 'income': {
        //   if (!uid) {
        //     gon.income = 'null'
        //   } else {
        //     try {
        //       temp = await this.ctx.service.income.get()
        //       gon.income = JSON.stringify(temp)
        //     } catch (err) {
        //       // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
        //       gon.income = 'null'
        //     }
        //   }
        // }
        // no-fallthrough
        case 'optionBalance': {
          if (!uid) {
            gon.optionBalance = 'null'
          } else {
            try {
              temp = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'optionBalance')
              gon.optionBalance = JSON.stringify(temp)
            } catch (err) {
              // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
              gon.optionBalance = 'null'
            }
          }
        }
        // no-fallthrough
        case 'frontedCurrency': {
          try {
            temp = await this.ctx.service.frontedCurrency.get()
            gon.frontedCurrency = JSON.stringify(temp)
          } catch (err) {
            // this.ctx.logger.error(`renderMultiInterface portal-${categories[i]} error`, err)
            gon.frontedCurrency = 'null'
          }
        }
        // no-fallthrough
        default: { break }
      }
    }
    const autoGon = await this.autoGonPageConfig()
    const result = Object.assign(gon, autoGon)
    return result
  },
  async autoGonPageConfig() {
    const keyList = this.app.config.autoGonPageConfig
    const redis = this.ctx.app.redis.get('portal')
    const opt = {}
    try {
      for (let i = 0; i < keyList.length; i++) {
        const key = keyList[i]
        const data = await redis.get(key)
        if (data) {
          const name = key.replace('portal:pageConfig:', '').replace(':pre', '')
          opt[name] = data
        }
      }
    } catch (err) {
      this.ctx.logger.debug('autoGonPageConfig error', err)
    }
    let autoGonPageConfigRendered = ''
    for (const p in opt) {
      autoGonPageConfigRendered += `
        ;gon.${p} = ${opt[p]};
      `
    }
    return { autoGonPageConfigRendered }
  },

  // 涨跌合约的排序
  async sortedOptionMarket({ origin, type }) {
    // 对call与put的排序
    let contract
    const call = []
    const put = []
    for (let i = 0; i < origin.length; i++) {
      contract = await this.parseOptionSchemaPath({ path: origin[i].code })
      if (contract.type === 'call') {
        call.push(origin[i])
      }
      if (contract.type === 'put') {
        put.push(origin[i])
      }
    }

    let target = {}
    switch (type) {
      case 'coin': {
        target.stableCoin = {}
        target.stableCoinTemp = {}
        target.thirdPartCoin = {}
        target = await this.sortForCoin({ origin: call.concat(put), target })
        target = await this.sortForTime({ target })
        break
      }
      case 'time': {
        target = await this.sortForOptionMarket({ origin: call.concat(put) })
        break
      }
      default: { break }
    }
    return target
  },

  async sortForOptionMarket({ origin }) {
    const hourList = []
    let dayList = []
    let contract
    const tempHour = {}
    let tempHourArray = []
    for (let i = 0; i < origin.length; i++) {
      contract = await this.parseOptionSchemaPath({ path: origin[i].code })
      if (contract.timeInterval === 'hour') {
        hourList.push(origin[i])
      }
      if (contract.timeInterval === 'day') {
        dayList.push(origin[i])
      }
    }
    for (let j = 0; j < hourList.length; j++) {
      contract = await this.parseOptionSchemaPath({ path: hourList[j].code })
      if (!_.isArray(tempHour[contract.amount])) {
        tempHour[contract.amount] = []
      }
      tempHour[contract.amount].push(hourList[j])
    }
    for (const temp in tempHour) {
      tempHour[temp] = await this.sortForMin({ origin: tempHour[temp] })
    }
    for (const k in tempHour) {
      tempHourArray.push(k)
      tempHour[k] = await this.sortCoin({ target: tempHour[k] })
    }
    tempHourArray = _.sortBy(tempHourArray, t => {
      return t
    })
    const target = []
    for (let kk = 0; kk < tempHourArray.length; kk++) {
      for (let kkk = 0; kkk < tempHour[tempHourArray[kk]].length; kkk++) {
        target.push(tempHour[tempHourArray[kk]][kkk])
      }
    }
    if (dayList.length > 0) {
      dayList = await this.sortCoin({ target: dayList })
    }

    for (let ii = 0; ii < dayList.length; ii++) {
      target.push(dayList[ii])
    }
    return target
  },

  async sortCoin({ target }) {
    let contract
    // const deliveryCurrency = await this.service.coinPermission.getDeliveryCurrency()
    // const stableCoin = _.isUndefined(deliveryCurrency.result.stable_coin) ? deliveryCurrency.result['0'] : deliveryCurrency.result.stable_coin
    let optionPermission = { result: [] }
    if (!_.isUndefined(this.ctx.currentMemberId)) {
      optionPermission = await this.ctx.service.coinPermission.getOptionPermission()
    }
    const coinPermission = optionPermission.result

    const usdt = []
    const at = []
    const tempThirdCoin = {}
    for (let jj = 0; jj < target.length; jj++) {
      contract = await this.parseOptionSchemaPath({ path: target[jj].code })
      if (contract.coin === 'usdt') {
        usdt.push(target[jj])
      }
      if (contract.coin === 'at') {
        at.push(target[jj])
      }
      for (let i = 0; i < coinPermission.length; i++) {
        if (contract.coin === coinPermission[i]) {
          if (!_.isArray(tempThirdCoin[contract.coin])) {
            tempThirdCoin[contract.coin] = []
          }
          tempThirdCoin[contract.coin].push(target[jj])
        }
      }
    }
    let final = []
    final = final.concat(usdt).concat(at)

    let tempKeyArray = []
    for (const key in tempThirdCoin) {
      tempKeyArray.push(key)
    }
    tempKeyArray = _.sortBy(tempKeyArray, key => {
      return key
    })

    for (let iii = 0; iii < tempKeyArray.length; iii++) {
      final = final.concat(tempThirdCoin[tempKeyArray[iii]])
    }
    return final
  },

  // 分钟的排序规则:按时间排
  async sortForMin({ origin }) {
    let contract,
      minTemp,
      min
    const temp = {}
    let tempArray = []
    const target = []
    for (let i = 0; i < origin.length; i++) {
      contract = await this.parseOptionSchemaPath({ path: origin[i].code })
      minTemp = contract.dayCall + contract.hourCall
      min = moment(minTemp, 'YYYYMMDDhhmm').unix()
      if (!_.isArray(temp[min])) {
        temp[min] = []
      }
      temp[min].push(origin[i])
    }
    for (const key in temp) {
      tempArray.push(key)
    }
    tempArray = _.sortBy(tempArray, t => {
      return t
    })
    for (let j = 0; j < tempArray.length; j++) {
      for (let k = 0; k < temp[tempArray[j]].length; k++) {
        target.push(temp[tempArray[j]][k])
      }
    }
    return target
  },

  async midHandleTimeSort({ target, type }) {
    let hourList = []
    let dayList = []
    let contract
    let tempHour = {}
    let tempHourArray = []
    for (const key in target[type]) {
      for (let i = 0; i < target[type][key].length; i++) {
        contract = await this.parseOptionSchemaPath({ path: target[type][key][i].code })
        if (contract.timeInterval === 'hour') {
          hourList.push(target[type][key][i])
        }
        if (contract.timeInterval === 'day') {
          dayList.push(target[type][key][i])
        }
      }
      for (let j = 0; j < hourList.length; j++) {
        contract = await this.parseOptionSchemaPath({ path: hourList[j].code })
        if (!_.isArray(tempHour[contract.amount])) {
          tempHour[contract.amount] = []
        }
        tempHour[contract.amount].push(hourList[j])
      }

      // 对小时进行分钟的排序
      for (const temp in tempHour) {
        tempHour[temp] = await this.sortForMin({ origin: tempHour[temp] })
      }

      for (const k in tempHour) {
        tempHourArray.push(k)
      }
      tempHourArray = _.sortBy(tempHourArray, t => {
        return t
      })
      target[type][key] = []
      for (let kk = 0; kk < tempHourArray.length; kk++) {
        target[type][key].push(tempHour[tempHourArray[kk]])
      }
      if (dayList.length > 0) {
        target[type][key].push(dayList)
      }
      hourList = []
      dayList = []
      tempHour = {}
      tempHourArray = []
    }
    return target
  },

  // 小时与天的排序规则
  async sortForTime({ target }) {
    target = await this.midHandleTimeSort({ target, type: 'stableCoin' })
    target = await this.midHandleTimeSort({ target, type: 'thirdPartCoin' })
    return target
  },

  // 归类及币的排序
  async sortForCoin({ origin, target }) {
    let contract
    const temp = {}
    const deliveryCurrency = await this.service.coinPermission.getDeliveryCurrency()
    const stableCoin = _.isUndefined(deliveryCurrency.result.stable_coin) ? deliveryCurrency.result['0'] : deliveryCurrency.result.stable_coin
    let optionPermission = { result: [] }
    if (!_.isUndefined(this.ctx.currentMemberId)) {
      optionPermission = await this.ctx.service.coinPermission.getOptionPermission()
    }
    const coinPermission = optionPermission.result
    for (let i = 0; i < origin.length; i++) {
      contract = await this.parseOptionSchemaPath({ path: origin[i].code })
      for (let j = 0; j < stableCoin.length; j++) {
        if (stableCoin[j] === contract.coin) {
          if (!_.isArray(target.stableCoinTemp[stableCoin[j]])) {
            target.stableCoinTemp[stableCoin[j]] = []
          }
          target.stableCoinTemp[stableCoin[j]].push(origin[i])
          break
        }
      }

      for (let k = 0; k < coinPermission.length; k++) {
        if (coinPermission[k] === contract.coin) {
          if (!_.isArray(temp[coinPermission[k]])) {
            temp[coinPermission[k]] = []
          }
          temp[coinPermission[k]].push(origin[i])
          break
        }
      }
    }
    // 手动排稳定币的顺序
    let usdt,
      at
    for (const key in target.stableCoinTemp) {
      if (key === 'usdt') {
        usdt = target.stableCoinTemp.usdt
      }
      if (key === 'at') {
        at = target.stableCoinTemp.at
      }
    }
    target.stableCoin.usdt = usdt
    target.stableCoin.at = at

    delete target.stableCoinTemp

    // 项目方币的排序
    let tempKeyArray = []
    for (const key in temp) {
      tempKeyArray.push(key)
    }
    tempKeyArray = _.sortBy(tempKeyArray, key => {
      return key
    })
    for (let i = 0; i < tempKeyArray.length; i++) {
      target.thirdPartCoin[tempKeyArray[i]] = temp[tempKeyArray[i]]
    }
    return target
  },

  async addMarket() {
    // const markets = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'mMarket')
    const markets = await this.ctx.service.ticker.get({})
    for (const key in markets.markets) {
      await this.ctx.app.redis.get('portal').sadd(this.ctx.app.config.portalNewestMarkets, key)
    }
    // for (let i = 0; i < markets.length; i++) {
    //   await this.ctx.app.redis.get('default').sadd('portal_newest_markets', markets[i].id)
    // }
  },
  // 传入api的名称检查当前用户是否处于白名单
  async whiteListCheckAPIUser(name) {
    let result = true
    const mapiConfig = this.app.config.mapiCommonCfg.urls
    if (mapiConfig[name] && mapiConfig[name].whiteListCheck) {
      result = await this.whiteListCheck()
    }
    return result
  },
  async isOptionAgree() {
    const ctx = this.ctx
    const redis = ctx.app.redis.get('portal')
    const memberId = ctx.currentMemberId
    const rkey = this.app.config.isOptionAgreeRedisKey
    const has = await redis.sismember(rkey, memberId)
    if (has) {
      // 缓存中如果存在则直接返回
      return { result: true }
    }
    const { result } = await this.ctx.service.optionUserAuthenticate.getAgree()
    // 如果已经验证过了添加进缓存
    if (result === true) {
      await redis.sadd(rkey, memberId)
    }
    return { result } // 缓存agree用户 在此判断是否同意
  },
  // 检查当前用户是否处于黑名单
  async whiteListCheck() {
    const ctx = this.ctx
    const list = (this.app.config.env !== 'prod' && this.app.config.env !== 'pre') ? limitUserIdsTech : limitUserIds
    const memberId = ctx.currentMemberId
    if (this.app.config.env !== 'prod' || this.app.config.env !== 'pre') {
      // ctx.logger.debug('whiteListCheck', memberId, JSON.stringify(list), list.indexOf(parseInt(memberId)))
    } else {
      // ctx.logger.debug('whiteListCheck', memberId, list.indexOf(parseInt(memberId)))
    }
    if (!memberId) {
      // 如果未登录
      return false
    } else if (memberId && list.indexOf(parseInt(memberId)) >= 0) {
      // 如果已经登录 而且在受限名单中
      return false
    }
    return true
  },
  // 移除掉url中不存在的 http://xx.com/:id 参数 > http://xx.com/
  removeNoExistsParams(url, params) {
    let newUrl = url
    url.replace(/\/:(\w+)/gi, function(match, p1) {
      const has = params[p1]
      if (_.isUndefined(has)) {
        newUrl = newUrl.replace(`/:${p1}`, '')
      }
    })
    return newUrl
  },
  // 将url中存在的 http://xx.com/:id/xx 替换
  templateUrl(str, options) {
    function replace(str, options) {
      if (!str) {
        return str
      }
      return str.replace(/\/:(\w+)/gi, function(match, p1) {
        const replacement = options[p1]
        if (_.isUndefined(replacement)) {
          throw new Error('templateUrl Could not find url parameter ' + p1 + ' in passed options object')
        }
        return `/${replacement}`
      })
    }
    options = options || {}
    const parsedUrl = url.parse(str)
    parsedUrl.pathname = replace(parsedUrl.pathname, options)
    parsedUrl.search = replace(parsedUrl.search, options)
    return url.format(parsedUrl)
  },
  async saveDataToRedis(json, key, cacheTime) {
    // this.ctx.logger.debug('saveDataToRedis', key, cacheTime)
    const defaultRedis = this.app.redis.get('portal')
    await defaultRedis.set(`portal-schedule-${key}:${this.app.config.env}`, JSON.stringify(json), 'EX', cacheTime)
  },
  async getCacheDataByRedis(key) {
    const defaultRedis = this.app.redis.get('portal')
    const jsonStr = await defaultRedis.get(`portal-schedule-${key}:${this.app.config.env}`)
    // this.ctx.logger.debug('getCacheDataByRedis', key, !!jsonStr)
    let json = null
    try {
      json = JSON.parse(jsonStr)
    } catch (e) {
      // this.ctx.logger.debug('saveDataToRedis parse json error', e.message, jsonStr)
    }
    return json
  },
  async renderTX() {
    const hashKey = this.app.config.transifexHash
    const hash = await this.app.redis.get('portal').get(hashKey)
    let transifex = {
      hash
    }
    if (!transifex.hash) {
      transifex = '{}'
    }
    return JSON.stringify(transifex)
  },

  async parseOptionSchemaPath({ path }) {
    let contract
    if (path.includes('/')) {
      contract = path.split('/')[3]
    } else {
      contract = path
    }
    const temp = contract.split('_')
    const target = {}
    target.reference = temp[0]
    if (contract.match(/^[a-z]{2,12}_\d{1,2}_[a-z]{2,6}_\d{8}_\d{4}_[a-z]{3,4}_[a-z]{2,8}$/)) {
      target.amount = temp[1]
      target.timeInterval = temp[2]
      target.dayCall = temp[3]
      target.hourCall = temp[4]
      target.type = temp[5]
      target.coin = temp[6]
    } else if (contract.match(/^[a-z]{2,12}_[a-z]{2,10}_[a-z]{2,10}_\d{1,2}_[a-z]{2,6}_\d{8}_\d{4}_[a-z]{3,4}_[a-z]{2,8}$/)) {
      target.payCoin = temp[1]
      target.settleCoin = temp[2]
      target.amount = temp[3]
      target.timeInterval = temp[4]
      target.dayCall = temp[5]
      target.hourCall = temp[6]
      target.type = temp[7]
      target.coin = temp[8]
    } else {
      // this.ctx.logger.info('ctx helper parsePath not match current market : ', path)
    }
    try {
      const min = target.hourCall.split('')
      target.minCall = min[2] + min[3]
    } catch (err) {
      // this.ctx.logger.error('ctx helper parsePath err : ', err)
    }
    return target
  },

  // async initAllOptionMarket() {
  //   const optionMarket = await this.ctx.service.coinPermission.getDeliveryCurrency()
  //   await this.ctx.app.redis.get('portal').set(this.ctx.app.config.portalAllOptionMarket, JSON.stringify(optionMarket), 'EX', 60*10)
  //   return
  // }

  async filter({ origin, category }) {
    const source = []
    let temp = {}
    let result = []
    let optionPermission = { result: [] }
    if (!_.isUndefined(this.ctx.currentMemberId)) {
      optionPermission = await this.ctx.service.coinPermission.getOptionPermission()
    }
    const coinPermission = optionPermission.result
    const deliveryCurrency = await this.ctx.service.coinPermission.getDeliveryCurrency()
    const stableCoin = _.isUndefined(deliveryCurrency.result.stable_coin) ? deliveryCurrency.result['0'] : deliveryCurrency.result.stable_coin
    switch (category) {
      case 'optionAccount': {
        for (let i = 0; i < origin.length; i++) {
          temp.code = origin[i].option_currency.code
          source.push(temp)
          temp = {}
        }
        break
      }
      case 'optionCurrencies': {
        for (let i = 0; i < origin.length; i++) {
          temp.code = origin[i].code
          source.push(temp)
          temp = {}
        }
        break
      }
      default: { break }
    }
    let usdt,
      at
    for (let i = 0; i < origin.length; i++) {
      for (let j = 0; j < stableCoin.length; j++) {
        if (source[i].code === stableCoin[j]) {
          result.push(origin[i])
        }
      }
    }
    for (let i = 0; i < result.length; i++) {
      if (result[i].code === 'usdt') {
        usdt = result[i]
      }
      if (result[i].code === 'at') {
        at = result[i]
      }
    }
    // 稳定币手排
    result = []
    result.push(usdt)
    result.push(at)
    let tempRet = []
    for (let i = 0; i < origin.length; i++) {
      for (let k = 0; k < coinPermission.length; k++) {
        if (source[i].code === coinPermission[k]) {
          tempRet.push(origin[i])
        }
      }
    }
    // 非稳定币按字母排序
    // _.groupBy(tempRet, ret => {
    //   return ret.code
    // })
    tempRet = _.orderBy(tempRet, [ 'code' ], [ 'asc' ])
    return result.concat(tempRet)
  },

  async getKline({ market }) {
    const target = moment().tz('Asia/Shanghai')
    const now = _.cloneDeep(target).startOf('day').unix()
    const key = `peatio:${market}:k:1`
    let temp = await this.ctx.app.redis.get('kline').lindex(key, 0)
    let offset,
      result
    if (!temp || temp === '') {
      throw new Error(`first ${key} not in redis`)
    }
    try {
      temp = JSON.parse(temp)[0]
      offset = (now - temp) / 60
      if (offset < 0) {
        throw new Error(`${now} is small than ${temp}`)
      }
      temp = await this.ctx.app.redis.get('kline').lindex(key, offset)
      if (!temp || temp === '') {
        throw new Error(`${now} ${key} not in redis`)
      }
      result = JSON.parse(temp)[1]
    } catch (err) {
      throw new Error(err)
    }
    return result
  },

  async calculate({ market, amount }) {
    let klineValue,
      total
    try {
      klineValue = await this.getKline({ market })
      total = parseFloat(klineValue) * parseFloat(amount)
    } catch (err) {
      throw new Error(err)
    }
    return total.toFixed(2)
  },

  async renderBanner() {
    const bannerKey = this.app.config.bannerKey
    const announceKey = this.app.config.announceKey
    const registerActive = this.app.config.registerActive
    const obj = {}

    try {
      obj.banner = await this.ctx.app.redis.get('portal').get(bannerKey)
      obj.announce = await this.ctx.app.redis.get('portal').get(announceKey)
      obj.registerActive = await this.ctx.app.redis.get('portal').get(registerActive)
    } catch (err) {
      throw new Error(err)
    }
    return obj
  },

  async initProMarket() {
    let target
    for (const key in proMarkets) {
      target = key.split('.')[0]
      if (target !== 'index') {
        await this.app.redis.get('portal').sadd(this.app.config.proMarkets, target)
      }
    }
  },

  async parseProMarket() {
    const path = this.ctx.request.path
    if (path.indexOf('/markets') > -1) {
      const temp = path.split('/')
      const market = temp[temp.length - 1]
      if (await this.app.redis.get('portal').sismember(this.app.config.proMarkets, market)) {
        return market
      }
    }
    return 'index'
  },

  async adList() {
    return this.app.redis.get('portal').get(this.app.config.adList)
  },

  tradingViewError(text) {
    return { status: 'error', message: text }
  },
  renderSitemapItem(urls) {
    const results = []
    for (let i = 0; i < urls.length; i++) {
      const langLinks = []
      const urlItem = urls[i]
      const parsedUrl = url.parse(urlItem)
      let defaultLocUrl = ''
      let defaultLink = '' // `<xhtml:link href="${urlItem}" hreflang="x-default" rel="alternate"/>`
      langList.forEach(langItem => {
        const pathname = `${langItem.local}${parsedUrl.pathname}` // 语言码拼接旧的路径
        let langUrl = url.format({// 转换成新的带语言码的urlurl
          protocol: parsedUrl.protocol,
          hostname: parsedUrl.hostname,
          pathname,
          query: parsedUrl.query
        })
        if (langUrl.endsWith('/')) { // 避免最后出现 "/" https://riostox.com/en/ => https://riostox.com/en
          langUrl = langUrl.substr(0, langUrl.length - 1)
        }
        const langStr = `<xhtml:link rel="alternate" hreflang="${langItem.local}" href="${langUrl}"/>`
        if (langItem.local.toLowerCase() === 'en') {
          defaultLink = `<xhtml:link href="${langUrl}" hreflang="x-default" rel="alternate"/>`
          defaultLocUrl = langUrl
        }
        langLinks.push(langStr)
      })
      const result = `
          <url>
            <loc>${defaultLocUrl}</loc>
            ${defaultLink}
            ${langLinks.join('\n')}
          </url>
        `
      results.push(result)
    }

    return results
  },
  renderSitemap(urls) {
    this.ctx.helper.alog('renderSitemap', JSON.stringify(urls))
    const { cacheTime, siteMapKey } = this.app.config.siteMapConfig
    let result = cache.get(siteMapKey) || ''
    if (!result) {
      urls = _.uniq(urls)
      const items = this.renderSitemapItem(urls)
      result = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${items.join('')}
      </urlset>
      `
      siteMapKey && cache.put(siteMapKey, result, cacheTime, () => { })
    }
    return result
  },

  csvBuffer(data) {
    let content = Buffer.from('\uFEFF')
    const params = data.originData
    switch (data.type) {
      case 'order':
        content += ` ${this.ctx.__('order.timestamp')} \t ${this.ctx.__('order.market')} \t ${this.ctx.__('order.type')} \t ${this.ctx.__('order.price')} \t ` +
        `${this.ctx.__('order.volume')} \t ${this.ctx.__('order.average_price')} \t ${this.ctx.__('order.fullfilled_volume')} ` +
        `\t ${this.ctx.__('order.amount')} \t ${this.ctx.__('order.state')}\t\n `
        params.forEach(ele => {
          content += moment(ele.created_at).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
          content += '\t'
          content += ele.market
          content += '\t'
          content += ele.side
          content += '\t'
          content += ele.price
          content += '\t'
          content += ele.volume
          content += '\t'
          content += ele.avg_price
          content += '\t'
          content += ele.executed_volume
          content += '\t'
          content += ele.amount
          content += '\t'
          content += ele.state
          content += '\t\n'
          if (Array.isArray(ele.trades) && ele.trades.length) {
            ele.trades.forEach(et => {
              content += `\t ${this.ctx.__('order.detail.time')} \t ${this.ctx.__('order.detail.price')} \t${this.ctx.__('order.detail.volume')} \t ` +
              `${this.ctx.__('order.detail.amount')} \t ${this.ctx.__('order.detail.fee')} \t\n `
              content += '\t'
              content += moment(et.date).utcOffset(480).format('MM-DD HH:mm:ss')
              content += '\t'
              content += et.price
              content += '\t'
              content += et.funds
              content += '\t'
              content += et.amount
              content += '\t'
              content += et.fee
              content += '\t\n'
            })
          }
        })
        break
      default:
        content += ` ${this.ctx.__('trades.created_at')} \t ${this.ctx.__('trades.market')} \t ${this.ctx.__('trades.side')} \t ${this.ctx.__('trades.price')} ` +
        `\t ${this.ctx.__('trades.volume')} \t ${this.ctx.__('trades.amount')} \t ${this.ctx.__('trades.fee')}\t\n `
        params.forEach(ele => {
          content += moment(ele.date).utcOffset(480).format('YYYY-MM-DD HH:mm:ss')
          content += '\t'
          content += ele.market
          content += '\t'
          content += ele.type
          content += '\t'
          content += ele.price
          content += '\t'
          content += ele.amount
          content += '\t'
          content += ele.funds
          content += '\t'
          content += ele.fee
          content += '\t\n'
        })
        break
    }
    return content
  }
}
