
const Service = require('egg').Service

class CoinPermission extends Service {

  async getDeliveryCurrency() {
    const result = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'deliveryCurrency')
    // this.ctx.logger.debug('CoinPermission deliveryCurrency ret : ', result)
    return { result }
  }

  async getOptionPermission() {
    const temp = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'optionPermission')
    // this.ctx.logger.debug('CoinPermission optionPermission ret : ', temp)
    const coin = this.ctx.app.config.downLineCoin
    const result = []
    let label = false
    for (let i = 0; i < temp.length; i++) {
      label = false
      for (let j = 0; j < coin.length; j++) {
        if (temp[i] === coin[j]) {
          label = true
        }
      }
      if (!label) {
        result.push(temp[i])
      }
    }
    return { result }
  }

}

module.exports = CoinPermission
