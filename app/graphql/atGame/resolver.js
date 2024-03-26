
module.exports = {
  Query: {

    async atGameTaskList(root, params, ctx) {
      return ctx.connector.atGame.atGameTaskList(params)
    },

    async atGameRewardHis(root, params, ctx) {
      return ctx.connector.atGame.atGameRewardHis(params)
    }
  },

}
