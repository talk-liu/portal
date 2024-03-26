
const Service = require('egg').Service
const path = require('path')
const sourceDataClient = path.resolve(__dirname, '../sourceDataClient')
const util = require('../util/index')

class DepthService extends Service {
  async loadPath() {
    return await path.join(sourceDataClient, this.ctx.app.config.switch.type, 'depth.js')
  }

  async initClient() {
    const depth = require(await this.loadPath())
    return new depth(util.serviceParams({
      class: 'depth',
      ctx: this.ctx
    }))
  }

  async get({ market }) {
    const depthInstance = await this.initClient()
    return depthInstance.get({ market })
  }
}

module.exports = DepthService
