
const util = require('./util')
const Basic = require('./basic')
const appUtil = require('../../util/index')
const moment = require('moment')
const _ = require('lodash')

class AtTotalInfo extends Basic {
  constructor(params) {
    super()
    this.params = params
  }

  async base(options) {
    options.class = 'atTotalInfo'
    options.lang = this.params.lang
    options.ctx = this.params.ctx
    if (appUtil.ifNeedAcl({
      class: options.class,
      ctx: options.ctx
    })) {
      options.memberId = this.params.memberId
      options.sessionId = this.params.sessionId
      options.redis = this.params.redis
    }
    let napi,
      mapi,
      temp,
      redisTempData,
      btcPrice,
      ethPrice,
      now,
      today,
      btc,
      eth,
      usdt,
      cp
    let data = []
    const redisData = await this.params.ctx.app.redis.get('portal').get(this.params.ctx.app.config.atTotalInfo)
    if (!redisData || redisData === '') {
      try {
        now = options.jsonParams.timestamp.utcOffset(480)
        today = _.cloneDeep(now).startOf('day')
        const timeInterval = util.timeExchange({ now, today })
        mapi = await util.marketPrice({
          now,
          today,
          lang: options.lang,
          ctx: options.ctx,
          market: 'atusdt'
        })
        options.jsonParams.timestamp = options.jsonParams.timestamp.unix()
        // options.ctx.logger.info('atTotalInfo', options.jsonParams.timestamp)
        napi = await util.base(options)
        if (napi.length !== mapi.length) {
          throw new Error('napi获取数据与mapi获取数据不对称')
        }

        btcPrice = await util.marketPrice({
          now,
          today,
          lang: options.lang,
          ctx: options.ctx,
          market: 'btcusdt'
        })

        ethPrice = await util.marketPrice({
          now,
          today,
          lang: options.lang,
          ctx: options.ctx,
          market: 'ethusdt'
        })

        for (let i = 0; i < napi.length; i++) {
          temp = napi[i]
          temp.atPrice = mapi[i].toFixed(2)
          usdt = temp.basicCP.usdt
          btc = temp.basicCP.btc * parseFloat(btcPrice[i])
          eth = temp.basicCP.eth * parseFloat(ethPrice[i])
          cp = usdt + btc + eth
          temp.atMiningCost = util.atMiningCost({
            basic: cp,
            interval: timeInterval[i]
          }).toFixed(2)
          temp.totalCP = (cp + parseFloat(temp.friendCP) + parseFloat(temp.ticketCP)).toFixed(2)
          // options.ctx.logger.debug('sourceBtc,sourceEth,btcPrice,ethPrice,usdt,btc,eth,cp,miner,total', temp.basicCP.btc, temp.basicCP.eth, parseFloat(btcPrice[i]), parseFloat(ethPrice[i]), usdt, btc, eth, cp, temp.atMiningCost, temp.totalCP)
          temp.basicCP = cp.toFixed(2)
          data.push(temp)
          temp = null
        }
        redisTempData = {
          atTotalInfo: data
        }
        await this.params.ctx.app.redis.get('portal').set(this.params.ctx.app.config.atTotalInfo, JSON.stringify(redisTempData), 'EX', 60 * 15)
      } catch (err) {
        throw new Error(err)
      }
    } else {
      data = JSON.parse(redisData).atTotalInfo
    }

    switch (options.category) {
      case 'get':
        return data
      case 'update':
      case 'delete':
      case 'add':
      default:
        return null
    }
  }

  async get() {
    const options = {}
    options.category = 'get'
    options.jsonParams = {
      timestamp: moment()
    }
    options.whichRouter = 'napi'
    return await this.base(options)
  }

  async update() { return null }

  async delete() { return null }

  async add() { return null }
}


module.exports = AtTotalInfo
