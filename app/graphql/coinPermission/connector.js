const DataLoader = require('dataloader')

class CoinPermissionConnector {
  constructor(ctx) {
    this.ctx = ctx
    this.loader = new DataLoader(this.fetch.bind(this))
  }

  fetch() {
    return null
  }

  getDeliveryCurrency() {
    return this.ctx.service.coinPermission.getDeliveryCurrency()
  }

  getOptionPermission() {
    return this.ctx.service.coinPermission.getOptionPermission()
  }

}

module.exports = CoinPermissionConnector

