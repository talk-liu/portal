
const DataLoader = require('dataloader')

class VoucherConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.voucher.get()
  }

  historyVoucher(params) {
    return this.ctx.service.voucher.historyVoucher(params)
  }

  inactiveVoucher() {
    return this.ctx.service.voucher.inactiveVoucher()
  }
}

module.exports = VoucherConnector

