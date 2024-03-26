
const Service = require('egg').Service
const _ = require('lodash')
class OptionContractsStatService extends Service {

  async get(params) {
    // this.ctx.logger.debug('contracts stat service', JSON.stringify(params))
    // return this.ctx.helper.mock('contracts_stat').data
    try {
      const ret = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionContractsStat')
      // this.ctx.logger.debug('optionContractsStat origin data : ', JSON.stringify(ret))
      const atToUsdtExercise = await this.ctx.helper.calculate({ market: 'atusdt', amount: ret.at.total_exercise_amount })
      const atToUsdtStrike = await this.ctx.helper.calculate({ market: 'atusdt', amount: ret.at.total_strike_amount })
      const total = {}
      total.exercise = 0
      total.strike = 0
      total.exercise = parseFloat(atToUsdtExercise) + parseFloat(ret.usdt.total_exercise_amount)
      total.strike = parseFloat(atToUsdtStrike) + parseFloat(ret.usdt.total_strike_amount)
      let tempToUsdtExercise,
        tempToUsdtStrike
      let midExercise = 0
      let midStrike = 0
      if (!_.isUndefined(this.ctx.currentMemberId)) {
        const { result } = await this.ctx.service.coinPermission.getOptionPermission()
        // this.ctx.logger.debug('optionContractsStat coinPermission data : ', JSON.stringify(result))
        for (let i = 0; i < result.length; i++) {
          if (!ret[result[i]]) {
            continue
          }
          if (await this.ctx.app.redis.get('portal').sismember(this.ctx.app.config.portalNewestMarkets, result[i] + 'usdt')) {
            tempToUsdtExercise = await this.ctx.helper.calculate({ market: result[i] + 'usdt', amount: ret[result[i]].total_exercise_amount })
            tempToUsdtStrike = await this.ctx.helper.calculate({ market: result[i] + 'usdt', amount: ret[result[i]].total_strike_amount })
            // this.ctx.logger.debug('optionContractsStat coinPermission temp usdt data : ', tempToUsdtExercise, tempToUsdtStrike)
          } else if (await this.ctx.app.redis.get('portal').sismember(this.ctx.app.config.portalNewestMarkets, result[i] + 'eth')) {
            tempToUsdtExercise = await this.ctx.helper.calculate({ market: result[i] + 'eth', amount: ret[result[i]].total_exercise_amount })
            tempToUsdtStrike = await this.ctx.helper.calculate({ market: result[i] + 'eth', amount: ret[result[i]].total_strike_amount })
            tempToUsdtExercise = await this.ctx.helper.calculate({ market: 'ethusdt', amount: tempToUsdtExercise })
            tempToUsdtStrike = await this.ctx.helper.calculate({ market: 'ethusdt', amount: tempToUsdtStrike })
            // this.ctx.logger.debug('optionContractsStat coinPermission temp eth data : ', tempToUsdtExercise, tempToUsdtStrike)
          } else if (await this.ctx.app.redis.get('portal').sismember(this.ctx.app.config.portalNewestMarkets, result[i] + 'btc')) {
            tempToUsdtExercise = await this.ctx.helper.calculate({ market: result[i] + 'btc', amount: ret[result[i]].total_exercise_amount })
            tempToUsdtStrike = await this.ctx.helper.calculate({ market: result[i] + 'btc', amount: ret[result[i]].total_strike_amount })
            tempToUsdtExercise = await this.ctx.helper.calculate({ market: 'btcusdt', amount: tempToUsdtExercise })
            tempToUsdtStrike = await this.ctx.helper.calculate({ market: 'btcusdt', amount: tempToUsdtStrike })
            // this.ctx.logger.debug('optionContractsStat coinPermission temp btc data : ', tempToUsdtExercise, tempToUsdtStrike)
          } else {
            // this.ctx.logger.error('service optionContractsStat coin not has its market')
            tempToUsdtExercise = '0'
            tempToUsdtStrike = '0'
          }
          // this.ctx.logger.debug('optionContractsStat coinPermission temp final data : ', tempToUsdtExercise, tempToUsdtStrike)
          if (!_.isUndefined(tempToUsdtExercise) && !_.isUndefined(tempToUsdtStrike)) {
            midExercise = midExercise + parseFloat(tempToUsdtExercise)
            midStrike = midStrike + parseFloat(tempToUsdtStrike)
          }
        }
        total.exercise = (total.exercise + midExercise).toFixed(2)
        total.strike = (total.strike + midStrike).toFixed(2)
      }
      ret.total = total
      return { result: ret }
    } catch (err) {
      throw new Error(err)
    }
  }
}

module.exports = OptionContractsStatService
