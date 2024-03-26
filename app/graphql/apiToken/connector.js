
const DataLoader = require('dataloader')

class ApiTokenConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  getApiToken() {
    return this.ctx.service.apiToken.getApiToken()
  }
  postApiToken(params) {
    return this.ctx.service.apiToken.postApiToken(params)
  }
  updateApiToken(params) {
    return this.ctx.service.apiToken.updateApiToken(params)
  }
  deleteApiToken(params) {
    return this.ctx.service.apiToken.deleteApiToken(params)
  }
}

module.exports = ApiTokenConnector

