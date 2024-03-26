
const Service = require('egg').Service

class FdtService extends Service {

  async getCountries(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'countries' }, 'fdt')
  }
  async getBank(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bank' }, 'fdt')
  }
  async getBanks(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'banks' }, 'fdt')
  }
  async postBankCards(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bankCards' }, 'fdt')
  }
  async getBankGet(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bankGet' }, 'fdt')
  }
  async getDepositList(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'depositList' }, 'fdt')
  }
  async getWithdrawList(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'withdrawList' }, 'fdt')
  }
  async postBankWires(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bankWires' }, 'fdt')
  }
  async getBankWiresGet(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bankWiresGet' }, 'fdt')
  }
  async getBankWiresList(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'bankWiresList' }, 'fdt')
  }
  async postFiat(params) {
    return this.ctx.service.generalRequest.request(params, { method: 'fiat' }, 'fdt')
  }
}

module.exports = FdtService
