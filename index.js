const fetch = require('isomorphic-fetch')

class Telegraph {
  constructor (token, opts) {
    this.options = Object.assign({
      token: token,
      apiRoot: 'https://api.telegra.ph'
    }, opts)
  }

  set token (token) {
    this.options.token = token
  }

  callService (method, payload) {
    return fetch(`${this.options.apiRoot}/${method}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(unwrap)
  }

  createAccount (shortName, name, url) {
    return this.callService('createAccount', {
      short_name: shortName,
      author_name: name,
      author_url: url
    })
  }

  createPage (title, content, authorName, authorUrl, returnContent) {
    return this.callService('createPage', {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent
    })
  }

  editAccountInfo (shortName, name, url) {
    return this.callService('editAccountInfo', {
      access_token: this.options.token,
      short_name: shortName,
      author_name: name,
      author_url: url
    })
  }

  editPage (path, title, content, authorName, authorUrl, returnContent) {
    return this.callService(`editPage/${path}`, {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent
    })
  }

  getPage (path, returnContent) {
    return this.callService(`getPage/${path}`, {
      access_token: this.options.token,
      return_content: returnContent
    })
  }

  getViews (path, year, month, day, hour) {
    return this.callService(`getViews/${path}`, {
      access_token: this.options.token,
      year: year,
      month: month,
      day: day,
      hour: hour
    })
  }

  getPageList (offset, limit) {
    return this.callService('getPageList', {
      access_token: this.options.token,
      offset: offset,
      limit: limit
    })
  }

  revokeAccessToken () {
    return this.callService('revokeAccessToken', {
      access_token: this.options.token
    })
  }
}

function unwrap (res) {
  if (!res.ok) {
    const err = new Error(res.statusText || 'Error calling telegra.ph')
    err.statusCode = res.status
    throw err
  }
  return res.json()
    .then((json) => {
      if (('ok' in json && !json.ok)) {
        throw new Error(json.error || 'Error calling telegra.ph')
      }
      return json.result
    })
}

module.exports = Telegraph
