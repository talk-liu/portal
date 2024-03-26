module.exports = {
  Query: {
    async optionExerciseDetail(root, params, ctx) {
      return await ctx.connector.optionExerciseDetail.get(params)
    }
  }
}
