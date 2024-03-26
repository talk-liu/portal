
const DataLoader = require('dataloader')

class AllCurrencyConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  async get(params) {
    // 币币
    const result = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'allCurrency')
    return result
  }
  async getOptionCurrencies(params){
    // option
    const origin = await this.ctx.service.generalRequest.request(params, { method: 'get' }, 'optionCurrencies')
    return this.ctx.helper.filter({origin, category: 'optionCurrencies'})
  }
  async total() {
    const all = await this.get()
    return all && all.currencies ? { count: all.currencies.length } : 0
  }

  async getFrontedCurrency() {
    return await this.ctx.service.frontedCurrency.get()
  }
}

module.exports = AllCurrencyConnector

