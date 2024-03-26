
const Service = require('egg').Service
class IsMinerService extends Service {

  async get() {
    const result = {}
    try {
      const url = this.ctx.app.config.frontedSpecialCfg.baseUrl + this.ctx.app.config.frontedCommonCfg.urls.isMiner.url
      const suffix = `?security=AEkawIH72rGb7GzP&uid=${this.ctx.currentMemberId}`
      // this.ctx.logger.debug('IsMiner : ' + url + suffix)
      const res = await this.ctx.app.curl(url + suffix, { method: 'GET', dataType: 'json' })
      if (res.status === 200) {
        result.ret = res.data
      } else {
        throw new Error(`${res}`)
      }
    } catch (err) {
      throw new Error(err)
    }
    return result
  }
}

module.exports = IsMinerService
