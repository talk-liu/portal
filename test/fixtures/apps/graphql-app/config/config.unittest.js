

exports.keys = 'plugin-graphql'
exports.middleware = [ 'graphql' ]
exports.graphql = {
  router: '/graphql',
  app: true,
  agent: false,
  graphiql: true,
  async onPreGraphQL() { return null },
  async onPreGraphiQL() { return null }
}
exports.switch = {
  type: 'http'
}
