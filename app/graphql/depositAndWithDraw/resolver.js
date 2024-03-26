
module.exports = {
  Query: {
    async withdrawAddress(root, {}, ctx) {
      return ctx.connector.depositAndWithDraw.getWithdrawAddress()
    },

    async depositHistory(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.getDepositHistory(params)
    },
    async applicants(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.postApplicants(params)
    },
    async sdkTokenKyc(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.postSdkTokenKyc(params)
    },
    async checkKyc(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.postCheckKyc(params)
    },

    async accountTransferHistory(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.getAccountTransferHistory(params)
    },

    async withdrawsHistory(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.getWithdrawsHistory(params)
    },

    async depositAddress(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.depositAddress(params)
    },

    async me(root, {}, ctx) {
      return ctx.connector.depositAndWithDraw.me()
    },

    async atVipGrade(root, {}, ctx) {
      return ctx.connector.depositAndWithDraw.atVipGrade()
    },

    async vipLevel(root, {}, ctx) {
      return ctx.connector.depositAndWithDraw.vipLevel()
    }
  },

  Mutation: {
    async withdrawVerify(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.verify(params)
    },

    async withdrawResend(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.resend(params)
    },

    async withdrawCreate(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.create(params)
    },

    async deleteAddress(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.deleteAddress(params)
    },

    async createAddress(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.createAddress(params)
    },

    async twoFactor(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.factor(params)
    },

    async confirmFactor(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.confirmFactor(params)
    },

    async appFactor(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.appFactor(params)
    },

    async resetPassword(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.resetPassword(params)
    },

    async documentSms(root, params, ctx) {
      return ctx.connector.depositAndWithDraw.documentSms(params)
    },

    async appFactorOtp(root, {}, ctx) {
      return ctx.connector.depositAndWithDraw.appFactorOtp()
    }
  }
}
