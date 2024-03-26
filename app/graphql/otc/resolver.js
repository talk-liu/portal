
module.exports = {
  Query: {
    async otc(root, {}, ctx) {
      return ctx.connector.otc.get()
    },
    async paymentOrder(root, {payment_id}, ctx) {
      return ctx.connector.otc.getPaymentOrder({payment_id})
    },
    async paymentOrderList(root, {page,page_size,state}, ctx) {
      return ctx.connector.otc.getPaymentOrderList({page,page_size,state})
    },
    async quote(root, {digital_currency,fiat_currency,requested_currency,requested_amount}, ctx) {
      return ctx.connector.otc.getQuote({digital_currency,fiat_currency,requested_currency,requested_amount})
    }
  },

  Mutation: {
    async createPaymentOrder(root, {quote_id}, ctx) {
      return ctx.connector.otc.createPaymentOrder({quote_id})
    }
  }
}