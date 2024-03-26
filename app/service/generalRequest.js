
const Service = require('egg').Service
const path = require('path')
const GeneralRequest = require(path.resolve(__dirname, '../sourceDataClient/http/generalRequest.js'))
const util = require('../util/index')
const _ = require('lodash')
const moment = require('moment')
const nanoid = require('nanoid')


class GenegralRequestService extends Service {
  async cacheResponseData(data, name, key) {
    const mapiConfig = this.app.config.mapiCommonCfg.urls
    const cacheConfig = mapiConfig[name] && mapiConfig[name].cache ? mapiConfig[name].cache : null
    if (cacheConfig && cacheConfig.time) {
      await this.ctx.helper.saveDataToRedis(data, key, cacheConfig.time)
    }
  }
  async findCacheData(key) {
    return await this.ctx.helper.getCacheDataByRedis(key)
  }
  async request(params, config, name) {
    const apiLog = !!this.ctx.request.query.api_log
    const isPass = await this.ctx.helper.whiteListCheckAPIUser(name)
    if (!isPass) {
      this.ctx.mapiErrCode = -100
      throw new Error(`permission denied ${name}`)
    }
    const cacheKey = JSON.stringify(params || {}) + `-${name}`
    const cacheData = await this.findCacheData(cacheKey)
    if (cacheData) {
      return cacheData
    }
    const sp = util.serviceParams({
      class: name,
      ctx: this.ctx
    })
    let rid = 0 // 用于每次请求时候生成一个id 便于查询
    if (apiLog) {
      rid = nanoid()
      this.ctx.logger.debug(JSON.stringify({
        action: 'GeneralRequest-start',
        rid,
        name,
        params,
        config,
        memberId: this.ctx.currentMemberId,
        time: moment().format()
      }))
    }
    const r = new GeneralRequest(sp)
    const result = await r.request(params, config, name)
      .catch(e => {
        this.ctx.logger.error('GeneralRequest catch request error', JSON.stringify(e))
        return {
          error: {
            message: e.message
          }
        }
      })
    if (apiLog) {
      this.ctx.logger.debug(JSON.stringify({
        action: 'GeneralRequest-end',
        rid,
        name,
        params,
        config,
        result,
        memberId: this.ctx.currentMemberId,
        time: moment().format()
      }))
    }
    if (!result) {
      return result
    }
    if (result.error) {
      this.ctx.logger.error('GeneralRequest error', name, JSON.stringify(result), JSON.stringify(params))
      const err = new Error()
      if (result.error.reason) {
        err.message = result.error.reason
      } else if (result.error.message) {
        err.message = result.error.message
      } else {
        err.message = JSON.stringify(result)
      }
      if (!_.isUndefined(result.error.code)) {
        this.ctx.mapiErrCode = result.error.code
        // TODO: ctx 无法传递，暂时使用，可能是egg-graphql版本问题
        global.mapiErrCode = result.error.code
      }
      this.ctx.originErr = result
      // TODO: ctx 无法传递，暂时使用，可能是egg-graphql版本问题
      global.originErr = result
      throw err
    }
    // 理论上需要使用参数序列化之后作为存储的key
    await this.cacheResponseData(result, name, cacheKey)
    return result
  }
}

module.exports = GenegralRequestService
