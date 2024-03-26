
const Controller = require('egg').Controller
const sendpulse = require('sendpulse-api')
const _ = require('lodash')
const util = require('../util/index')
const moment = require('moment')


class RestfulController extends Controller {
  async index() {
    await this.ctx.render('blank.nj', {
      title: this.ctx.__('index.title'),
      description: this.ctx.__('index.description'),
      keywords: this.ctx.__('index.keywords')
    })
  }

  async optionAccount() {
    let result
    try {
      result = await this.ctx.service.optionAccount.get({})
      // this.ctx.logger.debug('restful optionAccount : ', result)
    } catch (err) {
      // this.ctx.logger.error('restful error', err.message)
      this.ctx.body = []
    }
    if (_.isUndefined(result)) {
      result = []
    }
    this.ctx.body = result
  }

  async optionCurrencies() {
    let result
    try {
      result = await this.ctx.service.generalRequest.request({}, { method: 'get' }, 'optionCurrencies')
    } catch (err) {
      // this.ctx.logger.error('restful error', err.message)
      this.ctx.body = []
    }
    if (_.isUndefined(result)) {
      result = []
    }
    this.ctx.body = result
  }

  async otc() {
    let result
    try {
      result = await this.ctx.service.optionOtc.get()
    } catch (err) {
      // this.ctx.logger.error('restful error', err.message)
      this.ctx.body = []
    }
    this.ctx.body = result
  }

  async transferHistory() {
    await this.ctx.getCurrentMemberId()
    const params = {}
    if (this.ctx.query.page) {
      params.page = this.ctx.query.page
    }
    if (this.ctx.query.direction) {
      params.direction = this.ctx.query.direction
    }
    if (this.ctx.query.page_size) {
      params.page_size = this.ctx.query.page_size
    }
    let result
    try {
      result = await this.ctx.service.optionTransfersHistory.get(params)
    } catch (err) {
      // this.ctx.logger.error('restful error', err.message)
      this.ctx.body = []
    }
    this.ctx.body = result
  }

  // transifex语言rest接口
  async transifex() {
    let result
    try {
      result = await this.ctx.helper.renderTX()
    } catch (err) {
      // this.ctx.logger.error('restful error', err.message)
      this.ctx.body = {}
    }
    this.ctx.body = result
  }

  // 交易竞赛活动
  async competition() {
    let result
    const competition = this.app.config.env === 'pre' ? 'portal:pageConfig:competition_rank:pre' : 'portal:pageConfig:competition_rank'
    try {
      result = await this.app.redis.get('portal').get(competition)
    } catch (error) {
      // this.ctx.logger.error('restful error', error.message)
      this.ctx.body = {}
    }
    this.ctx.body = result
  }

  async tradingViewSave() {
    if (this.ctx.app.config.env !== 'local') {
      if (this.ctx.request.header.referer.indexOf(this.ctx.app.config.exchangeFrontedSpecialCfg.baseUrl) !== 0) {
        // this.ctx.logger.error('tradingViewSave referer is : ', this.ctx.request.header.referer)
        this.ctx.body = {}
        return
      }
    }
    const params = this.ctx.request.body
    if (!params.name || !params.content) {
      this.ctx.body = this.ctx.helper.tradingViewError('name or content can not be null')
      return
    }
    let result
    try {
      result = await this.ctx.service.tradingView.save(params)
    } catch (error) {
      // this.ctx.logger.error('restful error', error.message)
      this.ctx.body = this.ctx.helper.tradingViewError(error.message)
      return
    }
    this.ctx.body = result
  }

  async tradingViewDel() {
    let result
    try {
      result = await this.ctx.service.tradingView.del()
    } catch (error) {
      // this.ctx.logger.error('restful error', error.message)
      this.ctx.body = this.ctx.helper.tradingViewError(error.message)
      return
    }
    this.ctx.body = result
  }


  async tradingViewLoad() {
    let result
    const params = {}
    if (!_.isUndefined(this.ctx.request.query.template)) {
      params.template = this.ctx.request.query.template
    }
    try {
      result = await this.ctx.service.tradingView.load(params)
    } catch (error) {
      // this.ctx.logger.error('restful error', error.message)
      this.ctx.body = this.ctx.helper.tradingViewError(error.message)
      return
    }
    this.ctx.body = result
  }

  async document() {
    const files = this.ctx.request.files
    const params = this.ctx.request.body

    let result
    try {
      for (let i = 0; i < files.length; i++) {
        params[files[i].field] = files[i]
      }
      result = await this.ctx.service.member.document(params)
    } catch (error) {
      // this.ctx.logger.error('restful error', error.message)
      this.ctx.status = 400
      this.ctx.body = { error }
      return
    } finally {
      await this.ctx.cleanupRequestFiles()
    }
    this.ctx.body = result
  }
  async getAllMarkets() {
    let codes = []
    const { allMarkets } = await this.ctx.service.allMarkets.get()
    if (allMarkets && allMarkets.length) {
      codes = allMarkets.map(item => {
        return item.code
      })
    }
    return codes
  }
  // 将数据库中的交易对整理成url
  async getAllMarketsToUrls() {
    const codes = await this.getAllMarkets()
    const urls = []
    if (codes.length) {
      const pro = 'https://riostox.com/pro/markets/'
      const normal = 'https://riostox.com/markets/'
      codes.forEach(item => {
        urls.push(`${pro}${item}`)
        urls.push(`${normal}${item}`)
      })
    }
    return urls
  }
  async siteMap() {
    let result = ''
    let siteMapConfig = this.ctx.app.config.siteMap
    if (this.ctx.app.config.env === 'pre') {
      siteMapConfig = siteMapConfig + ':pre'
    }
    let siteMapRet = await this.ctx.app.redis.get('portal').get(siteMapConfig)
    this.ctx.helper.alog('siteMap redis data', JSON.stringify(siteMapRet))
    try {
      if (siteMapRet && siteMapRet !== '') {
        siteMapRet = JSON.parse(siteMapRet)
        siteMapRet = siteMapRet.list || []
        const allMarketsUrls = await this.getAllMarketsToUrls()
        this.ctx.helper.alog('siteMap allMarket', JSON.stringify(allMarketsUrls))
        siteMapRet = siteMapRet.concat(allMarketsUrls)
        result = this.ctx.helper.renderSitemap(siteMapRet)
      }
    } catch (err) {
      this.ctx.logger.error('restful siteMap existed error : ', err)
    }
    this.ctx.response.set('content-type', 'text/xml')
    this.ctx.body = result
  }

  async robots() {
    let result = ''
    let robotsConfig = this.ctx.app.config.robots
    const uaConfig = [
      'User-agent: *',
      'Allow: /',
      'Disallow: /*/reset_passwords/*',
      'Disallow: /*/platform_currency',
      'Disallow: /settings',
      'Disallow: /settings/*',
      'Disallow: /*?af*',
      'Disallow: /*?lang*',
      'Disallow: /*?from*',
      'Disallow: /*/funds/*',
      'Disallow: /*?*'
    ]
    if (this.ctx.app.config.env === 'pre') {
      robotsConfig = robotsConfig + ':pre'
    }
    let robotsRet = await this.ctx.app.redis.get('portal').get(robotsConfig)
    try {
      if (robotsRet && robotsRet !== '') {
        robotsRet = JSON.parse(robotsRet)
      }
      for (const key in robotsRet) {
        result = key + ': ' + robotsRet[key]
      }
    } catch (err) {
      // this.ctx.logger.error('restful robots existed error : ', err)
      this.ctx.body = ''
      return
    }
    uaConfig.push('\n' + result)
    this.ctx.body = uaConfig.join('\n')
  }

  // sendpulse
  async addEmail() {
    const { ctx } = this
    const { email } = ctx.request.body
    const { API_USER_ID, API_SECRET, TOKEN_STORAGE, LIST_Id } = this.app.config.sendConfig

    function initSendPulse(resolve, reject) {
      sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, token => {
        if (token) {
          resolve(token)
        } else {
          reject()
        }
      })
    }
    function addEmailToList(resolve, reject) {
      sendpulse.addEmails(data => {
        if (data) {
          resolve(data)
        } else {
          reject()
        }
      }, LIST_Id, [{ email, variables: {} }])
    }
    try {
      await util.becomePromise(initSendPulse)
      const data = await util.becomePromise(addEmailToList)
      this.ctx.body = data
    } catch (error) {
      this.ctx.body = { error_code: 500, message: 'error' }
    }
  }

  async EmailInfo() {
    const { ctx } = this
    let email = ctx.query.email
    email = decodeURIComponent(email)
    const { API_USER_ID, API_SECRET, TOKEN_STORAGE, LIST_Id } = this.app.config.sendConfig

    function initSendPulse(resolve, reject) {
      sendpulse.init(API_USER_ID, API_SECRET, TOKEN_STORAGE, token => {
        if (token) {
          resolve(token)
        } else {
          reject()
        }
      })
    }

    function findInfo(resolve, reject) {
      sendpulse.getEmailInfo(data => {
        if (data) {
          resolve(data)
        } else {
          reject()
        }
      }, LIST_Id, email)
    }

    try {
      await util.becomePromise(initSendPulse)
      const data = await util.becomePromise(findInfo)
      ctx.body = data
    } catch (error) {
      ctx.body = { error_code: 500, message: 'error' }
    }
  }

  async exportCsv() {
    const { ctx } = this
    const type = ctx.params.type

    const formatDate = date => {
      const reg = /(\d{4}).(\d{2}).(\d{2}) (\d{2}:\d{2}:\d{2})/g
      if (!reg.test(date)) throw 'date format error'
      return date.replace(reg, '$1-$2-$3 $4')
    }

    const params = {}
    let result,
      content,
      fileName
    const now = moment().utcOffset(480).format('YYYY-MM-DD hh-mm-ss')
    try {
      params.page_size = ctx.request.query.per_page
      params.from = moment(formatDate(ctx.request.query.from)).unix()
      params.to = moment(formatDate(ctx.request.query.to)).unix()

      switch (type) {
        case 'orders.csv':
          params.with_trades = true
          result = await ctx.service.generalRequest.request(params, { method: 'get' }, 'order')
          content = result.orders
          fileName = `riostox_orders_${now}`
          ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.csv`)
          ctx.set('content-type', 'application/csv; charset=utf-8')
          ctx.body = ctx.helper.csvBuffer({ type: 'order', originData: content })
          delete params.with_trades
          break
        case 'trades.csv':
          result = await ctx.service.generalRequest.request(params, { method: 'get' }, 'historyTrade')
          content = result.trades
          fileName = `riostox_trades_${now}`
          ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.csv`)
          ctx.set('content-type', 'application/csv; charset=utf-8')
          ctx.body = ctx.helper.csvBuffer({ type: 'trade', originData: content })
          break
        default: {
          result = await ctx.service.generalRequest.request(params, { method: 'get' }, 'order')
          content = result.orders
          fileName = `riostox_orders_${now}`
          ctx.set('Content-Disposition', `attachment; filename=${encodeURIComponent(fileName)}.csv`)
          ctx.set('content-type', 'application/csv; charset=utf-8')
          ctx.body = ctx.helper.csvBuffer({ type: 'order', originData: content })
          break
        }
      }
    } catch (err) {
      ctx.logger.error('exportCsv error : ', err)
      ctx.body = []
    }
  }

  async pusherAuth() {
    const { ctx } = this
    const params = ctx.request.body
    let result = []
    try {
      result = await ctx.service.generalRequest.request(params, {
        method: 'post'
      }, 'pusherAuth')
      ctx.body = result
    } catch (err) {
      ctx.logger.error('pusherAuth error : ', err)
      ctx.body = result
    }
  }

  // async signup() {
  //   const { ctx } = this
  //   const params = ctx.request.body
  //   try {
  //     ctx.body = await ctx.service.userSignin.signup(params)
  //   } catch (error) {
  //     ctx.logger.error('signup error : ', error)
  //     ctx.body = error.message
  //   }
  // }
}

module.exports = RestfulController
