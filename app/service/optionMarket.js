
const Service = require('egg').Service
const _ = require('lodash')
const moment = require('moment')

class OptionMarketService extends Service {

  async get(params) {
    // this.ctx.logger.debug('Markets service', JSON.stringify(
    //   params
    // ))

    // 区分登入态、区分稳定币与非稳定币
    let targetOptionMarket = []
    let contract
    const originOptionMarket = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionMarket')
    // const originOptionMarket = []
    // let state = false
    // // todo 这部分代码只是临时适配下线币种的作用
    // for (let i = 0; i < originOptionMarketTemp.length; i++) {
    //   contract = await this.ctx.helper.parseOptionSchemaPath({ path: originOptionMarketTemp[i].code })
    //   state = false
    //   for (let j = 0; j < this.ctx.app.config.downLineCoin.length; j++) {
    //     if (contract.coin === this.ctx.app.config.downLineCoin[j]) {
    //       state = true
    //     }
    //   }
    //   if (!state) {
    //     originOptionMarket.push(originOptionMarketTemp[i])
    //   }
    // }

    const deliveryCurrency = await this.ctx.service.coinPermission.getDeliveryCurrency()
    // 兼容下后端完全下币之后的数据结构
    if (deliveryCurrency.result === {}) {
      deliveryCurrency.result.stable_coin = []
    }

    let stableCoin = _.isUndefined(deliveryCurrency.result.stable_coin) ? deliveryCurrency.result['0'] : deliveryCurrency.result.stable_coin
    if (_.isUndefined(stableCoin)) {
      stableCoin = [ 'usdt', 'at' ]
    }

    let optionPermission = { result: [] }
    await this.ctx.getCurrentMemberId()

    if (!_.isUndefined(this.ctx.currentMemberId)) {
      optionPermission = await this.ctx.service.coinPermission.getOptionPermission()
    }
    const coinPermission = optionPermission.result
    for (let i = 0; i < originOptionMarket.length; i++) {
      for (let j = 0; j < stableCoin.length; j++) {
        contract = await this.ctx.helper.parseOptionSchemaPath({ path: originOptionMarket[i].code })
        if (contract.coin === stableCoin[j]) {
          targetOptionMarket.push(originOptionMarket[i])
        }
      }
    }
    if (!_.isUndefined(this.ctx.currentMemberId)) {
      for (let i = 0; i < originOptionMarket.length; i++) {
        for (let j = 0; j < optionPermission.result.length; j++) {
          contract = await this.ctx.helper.parseOptionSchemaPath({ path: originOptionMarket[i].code })
          if (contract.coin === coinPermission[j]) {
            targetOptionMarket.push(originOptionMarket[i])
          }
        }
      }
    }
    let temp,
      dayCall,
      hourCall,
      timeStamp
    for (let i = 0; i < targetOptionMarket.length; i++) {
      temp = await this.ctx.helper.parseOptionSchemaPath({ path: targetOptionMarket[i].code })
      dayCall = temp.dayCall
      hourCall = temp.hourCall
      timeStamp = moment(dayCall + hourCall, 'YYYYMMDDHHmmss').unix() * 1000
      targetOptionMarket[i].begin_time = timeStamp
    }

    if (_.isUndefined(params.ifSorted)) {
      params.ifSorted = false
    }

    if (params.ifSorted) {
      targetOptionMarket = await this.ctx.helper.sortedOptionMarket({ origin: targetOptionMarket, type: 'coin' })
    } else {
      targetOptionMarket = await this.ctx.helper.sortedOptionMarket({ origin: targetOptionMarket, type: 'time' })
    }

    return targetOptionMarket
  }
  async getOptionTicker(params) {
    // this.ctx.logger.debug('getOptionTicker service', JSON.stringify(
    //   params
    // ))
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionTicker')
  }
}

module.exports = OptionMarketService
