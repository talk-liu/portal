const DataLoader = require('dataloader')

class Geetest {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }
  
  fetch() {
    return null
  }

  registerGeetest() {
    return this.ctx.service.geetest.registerGeetest()
  }
}

module.exports = Geetest

