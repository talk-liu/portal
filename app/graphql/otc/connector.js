
const DataLoader = require('dataloader')

class OtcConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  get() {
    return this.ctx.service.otc.get()
  }

  getPaymentOrder({payment_id}) {
    return this.ctx.service.otc.getPaymentOrder({payment_id})
  }

  getPaymentOrderList({page,page_size,state}) {
    return this.ctx.service.otc.getPaymentOrderList({page,page_size,state})
  }

  getQuote({digital_currency,fiat_currency,requested_currency,requested_amount}) {
    return this.ctx.service.otc.getQuote({digital_currency,fiat_currency,requested_currency,requested_amount})
  }

  createPaymentOrder({quote_id}) {
    return this.ctx.service.otc.createPaymentOrder({quote_id})
  }
}

module.exports = OtcConnector

