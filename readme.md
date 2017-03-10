# 📝 telegra.ph
[![NPM Version](https://img.shields.io/npm/v/telegra.ph.svg?style=flat-square)](https://www.npmjs.com/package/telegra.ph)
[![Build Status](https://img.shields.io/travis/telegraf/telegra.ph.svg?branch=master&style=flat-square)](https://travis-ci.org/telegraf/telegra.ph)

Tiny API helper for Telegra.ph.

[Telegra.ph API docs](http://telegra.ph/api)

## API

## Installation

```js
$ npm install telegra.ph --save
```

## Example

```js
const Telegraph = require('telegra.ph')

const client = new Telegraph()

client.createAccount().then((account) => {
  client.token = account.access_token
  return client.getPageList()
}).then((pages) => console.log(pages))

```

```js
const Telegraph = require('telegra.ph')

const client = new Telegraph(process.env.TOKEN)
client.getPageList().then((pages) => console.log(pages))

```

## API documentation


#### [`createAccount`](http://telegra.ph/api#createAccount)
`.createAccount(shortName, name, url)`

#### [`createPage`](http://telegra.ph/api#createPage)
`.createPage(title, content, authorName, authorUrl, returnContent)`

#### [`editAccountInfo`](http://telegra.ph/api#editAccountInfo)
`.editAccountInfo(shortName, name, url)`

#### [`editPage`](http://telegra.ph/api#editPage)
`.editPage(path, title, content, authorName, authorUrl, returnContent)`

#### [`getPage`](http://telegra.ph/api#getPage)
`.getPage(path, returnContent)`

#### [`getViews`](http://telegra.ph/api#getViews)
`.getViews(path, year, month, day, hour)`

#### [`getPageList`](http://telegra.ph/api#getPageList)
`.getPageList(path, offset, limit)`

#### [`revokeAccessToken`](http://telegra.ph/api#revokeAccessToken)
`.revokeAccessToken()`
