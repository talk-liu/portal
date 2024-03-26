
module.exports = {
  Query: {
    async countries(root, params, ctx) {
      const result = ctx.connector.fdt.getCountries(params)
      return { markets: result }
    },
    async bank(root, params, ctx) {
      return ctx.connector.fdt.getBank(params)
    },
    async banks(root, params, ctx) {
      const result = ctx.connector.fdt.getBanks(params)
      return { result: result }
    },
    async bankCards(root, params, ctx) {
      const result = ctx.connector.fdt.postBankCards(params)
      return { result: result }
    },
    async bankGet(root, params, ctx) {
      const result = ctx.connector.fdt.getBankGet(params)
      return { result: result }
    },
    async depositList(root, params, ctx) {
      const result = ctx.connector.fdt.getDepositList(params)
      return { result: result }
    },
    async withdrawList(root, params, ctx) {
      const result = ctx.connector.fdt.getWithdrawList(params)
      return { result: result }
    },
    async bankWires(root, params, ctx) {
      const result = ctx.connector.fdt.postBankWires(params)
      return { result: result }
    },
    async bankWiresGet(root, params, ctx) {
      const result = ctx.connector.fdt.getBankWiresGet(params)
      return { result: result }
    },
    async bankWiresList(root, params, ctx) {
      const result = ctx.connector.fdt.getBankWiresList(params)
      return { result: result }
    },
    async fiat(root, params, ctx) {
      const result = ctx.connector.fdt.postFiat(params)
      return { result: result }
    },
  }
}
