
const path = require('path')
// had enabled by egg
// exports.static = true

exports.forI18 = {
  enable: true,
  path: path.resolve(__dirname, '../lib/egg-forI18')
}

exports.graphql = {
  enable: true,
  package: 'egg-graphql'
}

exports.cors = {
  enable: true,
  package: 'egg-cors'
}

exports.redis = {
  enable: true,
  package: 'egg-redis'
}

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks'
}

exports.i18n = {
  enable: true,
  package: 'egg-i18n'
}

