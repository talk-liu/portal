'use strict';
const util = require('../../../../app/util/index');

function hasLanguage(options) {
  const source = options.ctx.app.config.lang;
  let isLang = false;
  for (const key in source) {
    for (let i = 0; i < source[key].length; i++) {
      if (source[key][i] === options.lang) {
        isLang = true;
        break;
      }
    }
  }
  return isLang;
}

module.exports = () => {
  return async function lang(ctx, next) {
    const path = ctx.request.path;
    const queryParams = ctx.request.search;
    if (path.indexOf('/healthcheck') === 0) {
      ctx.body = 'alive';
      return;
    }

    // todo 从rails的redis中获取peatio:#{current_user.sn}:locale
    let cookieLang,
      uaLang,
      lang,
      locale;

    const local = path.split('/')[1];
    const hasLocal = hasLanguage({ lang: local, ctx });
    if (!hasLocal) {
      const urlLang = ctx.query.lang;
      if (!urlLang) {
        cookieLang = ctx.cookies.get('lang', {
          signed: false,
        });
        // ctx.logger.debug('locale-i18n', cookieLang);
        if (!cookieLang) {
          const uaLangStr = ctx.request.header['accept-language'];
          const uaLangArr = uaLangStr ? uaLangStr.split(',') : [];
          uaLang = uaLangArr[0] ? uaLangArr[0].split(';')[0] : uaLangArr[0];
          if (!uaLang) {
            lang = 'en';
          } else {
            lang = uaLang.trim();
          }
        } else {
          lang = cookieLang;
        }
      } else {
        lang = urlLang;
      }
    } else {
      lang = local;
    }
    const result = util.lang({
      lang,
      ctx,
    });


    if (path.indexOf('/history/') === 0) {
      return await next();
    }


    const localeArr = [ 'zh-CN', 'en', 'ko' ];
    if (localeArr.includes(result)) {
      locale = result;
    } else {
      locale = 'en';
    }
    // ctx.logger.debug('locale-i18n', locale);
    ctx.cookies.set('locale', locale, {
      httpOnly: false,
    });
    ctx.cookies.set('lang', result, {
      httpOnly: false,
    });

    ctx.lang = lang;

    // if (ctx.query.lang) {
    //   delete ctx.query.lang;
    //   ctx.query.locale = urlLang;
    // }

    if (`/${result}${path}${queryParams}` === '/en/pusher/auth') {
      return await next();
    }

    if (path === '/') {
      return ctx.redirect(`/${result}`);
    }
    if (!hasLocal) {
      return ctx.redirect(`/${result}${path}${queryParams}`);
    }

    return await next();
  };
};
