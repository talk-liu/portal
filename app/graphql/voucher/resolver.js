
module.exports = {
  Query: {
    voucher(root, {}, ctx) {
      return ctx.connector.voucher.get()
    },

    historyVoucher(root, params, ctx) {
      return ctx.connector.voucher.historyVoucher(params)
    },

    inactiveVoucher(root, {}, ctx) {
      return ctx.connector.voucher.inactiveVoucher()
    },
  },
}