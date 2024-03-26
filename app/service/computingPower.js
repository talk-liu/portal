
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class ComputingPowerService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'computingPower.js')
  }

  async initClient() {
    const computingPower = require(await this.loadPath())
    return new computingPower(util.serviceParams({
      class: 'computingPower',
      ctx: this.ctx
    }))
  }

  async get() {
    const computingPowerInstance = await this.initClient()
    return computingPowerInstance.get()
  }
}

module.exports = ComputingPowerService
