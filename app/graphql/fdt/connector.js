
const DataLoader = require('dataloader')

class FdtConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }
  async getCountries(params) {
    return this.ctx.service.fdt.getCountries(params)
  }
  async getBank(params) {
    return this.ctx.service.fdt.getBank(params)
  }
  async getBanks(params) {
    return this.ctx.service.fdt.getBanks(params)
  }
  async postBankCards(params) {
    return this.ctx.service.fdt.postBankCards(params)
  }
  async getBankGet(params) {
    return this.ctx.service.fdt.getBankGet(params)
  }
  async getDepositList(params) {
    return this.ctx.service.fdt.getDepositList(params)
  }
  async getWithdrawList(params) {
    return this.ctx.service.fdt.getWithdrawList(params)
  }
  async postBankWires(params) {
    return this.ctx.service.fdt.postBankWires(params)
  }
  async getBankWiresGet(params) {
    return this.ctx.service.fdt.getBankWiresGet(params)
  }
  async getBankWiresList(params) {
    return this.ctx.service.fdt.getBankWiresList(params)
  }
  async postFiat(params) {
    return this.ctx.service.fdt.postFiat(params)
  }

}

module.exports = FdtConnector

