
module.exports = {
  Query: {
    member(root, {}, ctx) {
      return ctx.connector.member.get()
    },
  },
}
