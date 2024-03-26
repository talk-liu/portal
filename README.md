# portal-node



## 快速入门

<!-- 在此次添加使用文档  asdf -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org

### Graphql接口使用

```bash
computingPower:
favoriteMarket:
    获取收藏交易对接口：
        type：get
        req：/graphql?query={ favoriteMarket { fm }}
        res：{
                "data": {
                    "favoriteMarket": {
                        "fm": [
                            "btcusdt",
                            "atbtc",
                            "ltcbtc",
                            "ethbtc",
                            "atusdt",
                            "ateth"
                        ]
                    }
                }
            }
    增加一个收藏交易对接口：
        type：post
        req：{
                  query: `mutation {
                    updateFavoriteMarket(market: \"ethusdt\") { market }
                  }`,
                  variables: {
                    market: "ethusdt"
                  }
             }
        res：{ data: { updateFavoriteMarket: { market: 'success' } } }
    删除一个收藏交易对接口：
        type：post
        req：{
                  query: `mutation {
                    deleteFavoriteMarket(market: \"ethusdt\") { market }
                  }`,
                  variables: {
                    market: "ethusdt"
                  }
             }
        res：{ data: { deleteFavoriteMarket: { market: 'success' } } }
icoAndOp:
    获取新币上线通知：
    type：get
    req：/graphql?query={ icoAndOp { ico operationActivity }}
    res：{
          "data": {
            "icoAndOp": {
              "ico": {
                "title": "首页新币上线",
                "list": [
                  {
                    "title": "XLM",
                    "text": "XLM（Stellar）依托区块链技术，可在2-5秒内连接180种货币，连接银行、支付系统以及用户，减少跨境支付带来的交易费用和时间延迟。",
                    "titleTag": {},
                    "officialLink": "https://www.stellar.org/",
                    "pair": "xlmbtc",
                    "publishedTime": "2018-08-15",
                    "textEn": "Stellar is a blockchain-based platform that connects banks, payments systems, and people with blockchain technology.",
                    "img": "https://i.riostox.com/i/8c/8c39bf5ea60880cf7a356fd8421ffdd2.png",
                    "offering_cny": "1.5765",
                    "offering_usd": "0.226",
                    "moreLink": "https://help.riostox.com/hc/zh-cn/articles/360013139472--%E4%B8%8A%E5%B8%81%E5%85%AC%E5%91%8A-Riostox%E4%B8%8A%E7%BA%BFXLM",
                    "moreLinkEn": "https://help.riostox.com/hc/en-us/articles/360013139472-New-Listing-XLM-Now-Available"
                  },
                  {
                    "title": "HOT",
                    "text": "HOT（Holo）借助BitTorrent的并行性，为分布式应用（DAPP）提供动力。Holo可以将具有用户自主权的分布式Web直接构建到其架构和协议中。",
                    "titleTag": {},
                    "officialLink": "https://holo.host/",
                    "pair": "hotbtc",
                    "publishedTime": "2018-08-15",
                    "textEn": "Holo provides blockchain technology, value-stable cryptocurrency, and p2p hosting of scalable, distributed apps.",
                    "img": "https://i.riostox.com/i/33/337bb261f0bf3fd512300ab5a2583b82.png",
                    "offering_cny": "0.0044",
                    "offering_usd": "0.00063",
                    "moreLink": "https://help.riostox.com/hc/zh-cn/articles/360013139412--%E4%B8%8A%E5%B8%81%E5%85%AC%E5%91%8A-Riostox%E4%B8%8A%E7%BA%BFHOT",
                    "moreLinkEn": "https://help.riostox.com/hc/en-us/articles/360013139412-New-Listing-HOT-Now-Available"
                  },
                  {
                    "title": "DNT",
                    "text": "DNT（District0x）网络社区是一个去中心化的开源自治社区，支持所有的社区成员部署自己的网络应用。",
                    "titleTag": {},
                    "officialLink": "https://district0x.io/",
                    "pair": "dntbtc",
                    "publishedTime": "2018-08-08",
                    "textEn": "District0x Network is a collective of decentralized marketplaces and communities.",
                    "img": "https://i.riostox.com/i/1d/1d1b2432700c853d9dfd95f47b1937fa.png",
                    "offering_cny": "0.1944",
                    "offering_usd": "0.0281",
                    "moreLink": "https://help.riostox.com/hc/zh-cn/articles/360012415892--%E4%B8%8A%E5%B8%81%E5%85%AC%E5%91%8A-Riostox%E4%B8%8A%E7%BA%BFDNT",
                    "moreLinkEn": "https://help.riostox.com/hc/en-us/articles/360012415892--%E4%B8%8A%E5%B8%81%E5%85%AC%E5%91%8A-Riostox%E4%B8%8A%E7%BA%BFDNT"
                  },
                  {
                    "title": "SALT",
                    "text": "SALT是一个基于会员的贷款和借款网络，允许用户利用其区块链资产来确保现金贷款。",
                    "titleTag": {},
                    "officialLink": "https://saltlending.com/",
                    "pair": "saltbtc",
                    "publishedTime": "2018-08-08",
                    "textEn": "SALT is the first asset-backed lending platform allowing you to loan without selling your cryptocurrencies.",
                    "img": "https://i.riostox.com/i/2a/2a31ac750c0463f5c5ab5029706ee623.png",
                    "offering_cny": "4.2885",
                    "offering_usd": "0.6293",
                    "moreLink": "https://help.riostox.com/hc/zh-cn/articles/360012414572--%E4%B8%8A%E5%B8%81%E5%85%AC%E5%91%8A-Riostox%E4%B8%8A%E7%BA%BFSALT",
                    "moreLinkEn": "https://help.riostox.com/hc/en-us/articles/360012414572-New-Listing-SALT-Now-Available"
                  }
                ]
              },
              "operationActivity": {
                "en": {
                  "pic": {
                    "img": "https://i.riostox.com/i/cb/cb8fefde551f9d083dd2a9a57ba91955.png",
                    "title": "EOS MAINNET",
                    "sub": "Swap Upgrade Plan",
                    "href": "https://"
                  },
                  "text": [
                    {
                      "title": "NEW LISTINGS",
                      "href": "https://"
                    },
                    {
                      "title": "AT Rewards Distribution to be Upgraded",
                      "href": "https://"
                    },
                    {
                      "title": "Grand 150,000 USDT Aridrops Exclusive to AT Holders ",
                      "href": "https://"
                    }
                  ]
                },
                "zh-CN": {
                  "pic": {
                    "img": "https://i.riostox.com/i/cb/cb8fefde551f9d083dd2a9a57ba91955.png",
                    "title": "EOS MAINNET",
                    "sub": "Swap Upgrade Plan",
                    "href": "https://"
                  },
                  "text": [
                    {
                      "title": "NEW LISTINGS",
                      "href": "https://"
                    },
                    {
                      "title": "AT Rewards Distribution to be Upgraded",
                      "href": "https://"
                    },
                    {
                      "title": "Grand 150,000 USDT Aridrops Exclusive to AT Holders",
                      "href": "https://"
                    }
                  ]
                }
              }
            }
          }
        }
income: 
kline:
    获取多个交易对K线的接口：
    type：get
    req：/graphql?query={ kline(markets: \"ethbtc\", limit: 14, period: 10080) {kline} }
    res：{
          "data": {
            "kline": {
              "result": {
                "atbtc": [[],[],[]]
              }
            }
          }
         }
market:
member:
otc:
platformProfit
```
