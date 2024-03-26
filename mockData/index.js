const path = require('path')
const glob = require('glob')

const result = {}
const files = glob.sync(path.join(__dirname, './*/*.json'), {
  mark: true,
  sync: true
})

files.forEach(file => {
  const name = path.basename(file).replace('.json', '')
  // console.log('file', file, name)
  const model = require(file)
  result[name] = model
})

module.exports = result
