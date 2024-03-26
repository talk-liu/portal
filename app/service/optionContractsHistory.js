
const Service = require('egg').Service
const _ = require('lodash')
class OptionContractsHistoryService extends Service {

  async get(params) {
    // return this.ctx.helper.mock('contracts_history').data
    let optionPermission = { result: [] }
    if (!_.isUndefined(this.ctx.currentMemberId)) {
      optionPermission = await this.ctx.service.coinPermission.getOptionPermission()
    }

    const coinPermission = optionPermission.result
    const deliveryCurrency = await this.ctx.service.coinPermission.getDeliveryCurrency()
    const stableCoin = _.isUndefined(deliveryCurrency.result.stable_coin) ? deliveryCurrency.result['0'] : deliveryCurrency.result.stable_coin
    let codes = ''
    for (let j = 0; j < stableCoin.length; j++) {
      codes = codes + stableCoin[j]
      if (j < stableCoin.length - 1) {
        codes = codes + ','
      }
    }
    for (let i = 0; i < coinPermission.length; i++) {
      if (coinPermission.length > 0) {
        codes = codes + ','
      }
      codes = codes + coinPermission[i]
      if (i < coinPermission.length - 1) {
        codes = codes + ','
      }
    }
    params.delivery_currency_codes = codes
    // this.ctx.logger.debug('contracts history service', JSON.stringify(params))
    return this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionContractsHistory')
  }
}

module.exports = OptionContractsHistoryService
