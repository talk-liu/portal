
const Service = require('egg').Service
class IcoAndOpService extends Service {

  // todo 还需改进成从持久化的数据层逻辑器拿数据
  async get() {
    const result = {}
    let ico = this.ctx.app.config.ico
    let news = this.ctx.app.config.news
    let candy_amount = this.ctx.app.config.candyAmount
    let appConfigTemp = this.ctx.app.config.appConfig
    let fundsInterlocutionTemp = this.ctx.app.config.fundsInterlocution
    let depositRemarksNewTemp = this.ctx.app.config.depositRemarksNew
    let registerActiveTemp = this.ctx.app.config.registerActive
    if (this.ctx.app.config.env === 'pre') {
      ico = ico + ':pre'
      news = news + ':pre'
      candy_amount = candy_amount + ':pre'
      appConfigTemp = appConfigTemp + ':pre'
      fundsInterlocutionTemp = fundsInterlocutionTemp + ':pre'
      depositRemarksNewTemp = depositRemarksNewTemp + ':pre'
      registerActiveTemp = registerActiveTemp + ':pre'
    }
    let icoRet = await this.ctx.app.redis.get('portal').get(ico)
    let opRet = await this.ctx.app.redis.get('portal').get(news)
    let candy = await this.ctx.app.redis.get('portal').get(candy_amount)
    let appConfig = await this.ctx.app.redis.get('portal').get(appConfigTemp)
    let fundsInterlocution = await this.ctx.app.redis.get('portal').get(fundsInterlocutionTemp)
    let depositRemarksNew = await this.ctx.app.redis.get('portal').get(depositRemarksNewTemp)
    let registerActive = await this.ctx.app.redis.get('portal').get(registerActiveTemp)
    try {
      if (icoRet && icoRet !== '') {
        icoRet = JSON.parse(icoRet)
      }
      if (opRet && opRet !== '') {
        opRet = JSON.parse(opRet)
      }
      if (candy && candy !== '') {
        candy = JSON.parse(candy)
      }
      if (appConfig && appConfig !== '') {
        appConfig = JSON.parse(appConfig)
      }
      if (fundsInterlocution && fundsInterlocution !== '') {
        fundsInterlocution = JSON.parse(fundsInterlocution)
      }
      if (depositRemarksNew && depositRemarksNew !== '') {
        depositRemarksNew = JSON.parse(depositRemarksNew)
      }
      if (registerActive && registerActive !== '') {
        registerActive = JSON.parse(registerActive)
      }
    } catch (err) {
      throw (err)
    }
    result.ico = icoRet
    result.operationActivity = opRet
    result.candy = candy
    result.appConfig = appConfig
    result.fundsInterlocution = fundsInterlocution
    result.depositRemarksNew = depositRemarksNew
    result.registerActive = registerActive
    return result
  }
}

module.exports = IcoAndOpService
