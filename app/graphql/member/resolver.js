
module.exports = {
  Query: {
    member(root, {}, ctx) {
      return ctx.connector.member.get()
    },
    historyMining(root, params, ctx) {
      return ctx.connector.member.historyMining(params)
    },
    historyProfits(root, params, ctx) {
      return ctx.connector.member.historyProfits(params)
    },
    captcha(root, {}, ctx) {
      return ctx.connector.member.captcha({})
    },
    challenge(root, {}, ctx) {
      return ctx.connector.member.challenge({})
    }
  },
  Mutation: {
    verify(root, params, ctx) {
      return ctx.connector.member.verify(params)
    },
    faceppVerify(root, {}, ctx) {
      return ctx.connector.member.faceppVerify()
    },
    document(root, params, ctx) {
      return ctx.connector.member.document(params)
    },
  }
}