
const staticHash = async function(options) {
  if (options.config.env === 'local') {
    return ''
  }
  const hash = await options.redis.get('portal').get(options.config.staticHashKey)
  if (!hash || hash === '') {
    throw new Error('hash does not existed')
  }
  return hash
}
const staticOptionHash = async function(options) {
  if (options.config.env === 'local') {
    return ''
  }
  const hash = await options.redis.get('portal').get(options.config.staticOptionHashKey)
  if (!hash || hash === '') {
    throw new Error('hash does not existed')
  }
  return hash
}
const ifNeedAcl = function(options) {
  if (options.class === 'member' || options.class === 'refreshToken') {
    return true
  }
  const aclClass = options.ctx.app.config.graphqlAcl
  for (let i = 0; i < aclClass.length; i++) {
    if (options.class === aclClass[i]) {
      return true
    }
  }
  return false
}

const serviceParams = function(options) {
  const ctx = options.ctx
  const result = {}
  result.lang = ctx.getLang()
  result.ctx = ctx
  if (ifNeedAcl({
    class: options.class,
    ctx
  })) {
    result.redis = ctx.app.redis
    result.memberId = ctx.currentMemberId
    result.sessionId = ctx.sessionId
  }
  if (options.class === 'member') {
    // ctx.logger.debug('memberId in util is : ', result.memberId, ', sessionId in util is : ', result.sessionId)
  }
  return result
}

const authGraphql = function(options) {
  return options.ctx.request.method === 'GET' && options.ctx.request.url === '/graphql' && options.ctx.app.config.env === 'prod'
}

const ifGraphql = function(options) {
  return options.ctx.request.method === 'GET' && options.ctx.request.url === '/graphql'
}

const parseActionFromCtx = function(options) {
  const source = options.ctx.request.body.query
  const temp = source ? source.split('{')[0].trim() : ''
  // options.ctx.logger.debug(`parseActionFromCtx : ${temp.includes('mutation')}`)
  return temp.includes('mutation')
}

const parseClassFromCtx = function(options) {
  let result = null
  let source,
    temp
  switch (options.ctx.request.method) {
    case 'GET':
      source = options.ctx.request.url
      temp = source.split('?')[0].trim()
      if (temp.indexOf('/') !== -1) {
        result = temp.split('/')[1].trim()
      }
      break
    case 'POST':
      source = options.ctx.request.body.query
      temp = source.split('{')[1].trim()
      result = temp
      if (temp.indexOf('(') !== -1) {
        result = temp.split('(')[0].trim()
      }
      break
    default:
      break
  }
  return result
}

const lang = function(options) {
  const source = options.ctx.app.config.lang
  for (const key in source) {
    for (let i = 0; i < source[key].length; i++) {
      if (source[key][i] === options.lang) {
        return key
      }
    }
  }
  return 'en'
}

const becomePromise = async function(fn) {
  return new Promise((resolve, reject) => {
    fn(resolve, reject)
  })
}

module.exports.staticHash = staticHash
module.exports.staticOptionHash = staticOptionHash
module.exports.serviceParams = serviceParams
module.exports.ifNeedAcl = ifNeedAcl
module.exports.parseClassFromCtx = parseClassFromCtx
module.exports.parseActionFromCtx = parseActionFromCtx
module.exports.ifGraphql = ifGraphql
module.exports.authGraphql = authGraphql
module.exports.lang = lang
module.exports.becomePromise = becomePromise
