'use strict';

/**
 * egg-forI18 default config
 * @member Config#forI18
 * @property {String} SOME_KEY - some description
 */
const ignorePath = [ '/graphql', '/sitemap.xml', '/robots.txt', '/portal' ];
exports.forI18 = {
  ignore(ctx) {
    const path = ctx.request.path;
    for (let i = 0; i < ignorePath.length; i++) {
      if (path.indexOf(ignorePath[i]) === 0) {
        return true;
      }
    }
  },
};
