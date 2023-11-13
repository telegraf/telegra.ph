import type { Account, Node, Page, PageList, PageViews } from "./typings"
import { type Client, HTTPS } from "./clients"

export type Options = {
  token?: string
  apiRoot?: string
  client?: new (baseURL: string) => Client
}

/**
 * Initialize new Telegraph app.
 * @param {string} token Access token
 * @param {Options} opts options
 * @example
 * new Telegraph(token, opts)
 */
export default class Telegraph {
  private options: Options
  protected client: Client

  constructor(token: string, opts?: Options) {
    if (opts?.apiRoot) {
      opts.apiRoot = opts.apiRoot.endsWith("/") ? opts.apiRoot : opts.apiRoot + "/"
    }
    this.options = {
      apiRoot: "https://api.telegra.ph/",
      client: HTTPS,
      ...opts,
      token,
    }

    if (!this.options.apiRoot) throw new Error("apiRoot is required")
    if (!this.options.client) throw new Error("client is required")

    this.client = new this.options.client(this.options.apiRoot)
  }

  public set token(token: string) {
    this.options.token = token
  }

  /**
   * Use this method to create a new Telegraph account. Most users only need one account, but this can be useful for channel administrators who would like to keep individual author names and profile links for each of their channels.
   * @param {string} shortName **1-32 characters.** **Required.** Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.
   * @param {string} name **0-128 characters.** Default author name used when creating new articles.
   * @param {string | undefined} url **0-512 characters.** Default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
   * @returns {Promise<Account>} On success, returns an [`Account`](https://telegra.ph/api#Account) object with the regular fields and an additional `access_token` field.
   * @example
   * const telegraph = new Telegraph(token)
   * const account = await telegraph.createAccount('Sandbox', 'Anonymous')
   */
  public createAccount<R = Account>(shortName: string, name: string, url?: string): Promise<R> {
    return this.client.post("createAccount", {
      short_name: shortName,
      author_name: name,
      author_url: url,
    })
  }

  /**
   * Use this method to create a new Telegraph page.
   * @see https://telegra.ph/api#createPage
   * @param {string} title **1-256 characters.** **Required.** Page title.
   * @param {Array<Node>} content Content of the page.
   * @param {string} authorName **0-128 characters.** Author name, displayed below the article's title.
   * @param {string | undefined} authorUrl **0-512 characters.** Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
   * @param {boolean | undefined} returnContent If `true`, a `content` field will be returned in the Page object (see: [Content format](https://telegra.ph/api#Content-format)).
   * @returns {Promise<Page>} On success, returns a [`Page`](https://telegra.ph/api#Page) object.
   * @example
   * const telegraph = new Telegraph(token)
   * const content = [ { tag: 'p', children: [ 'Hello, world!' ] } ]
   * const page = await telegraph.createPage('Sample Page', content, 'Anonymous')
   */
  public createPage<R = Page>(title: string, content: Array<Node>, authorName: string, authorUrl?: string, returnContent?: boolean): Promise<R> {
    return this.client.post("createPage", {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent,
    })
  }

  /**
   * Use this method to update information about a Telegraph account. Pass only the parameters that you want to edit.
   * @see https://telegra.ph/api#editAccountInfo
   * @param {string | undefined} shortName New account name.
   * @param {string | undefined} name New default author name used when creating new articles.
   * @param {string | undefined} url  New default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
   * @returns {Promise<Account>} On success, returns an [`Account`](https://telegra.ph/api#Account) object with the default fields.
   * @example
   * const telegraph = new Telegraph(token)
   * const account = await telegraph.editAccountInfo(, 'Anonymous', 'https://telegra.ph/api')
   */
  public editAccountInfo<R = Account>(
    shortName: string | undefined = undefined,
    name: string | undefined = undefined,
    url: string | undefined = undefined
  ): Promise<R> {
    return this.client.post("editAccountInfo", {
      access_token: this.options.token,
      short_name: shortName,
      author_name: name,
      author_url: url,
    })
  }

  /**
   * Use this method to edit an existing Telegraph page.
   * @see https://telegra.ph/api#editPage
   * @param {string} path **Required.** Path to the page.
   * @param {string} title **1-256 characters.** **Required.** Page title.
   * @param {Array<Node>} content **up to 64 KB.** **Required.** Content of the page.
   * @param {string | undefined} authorName **0-128 characters.** Author name, displayed below the article's title.
   * @param {string | undefined} authorUrl **0-512 characters.** Profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
   * @param {boolean | undefined} returnContent If `true`, a `content` field will be returned in the Page object (see: [Content format](https://telegra.ph/api#Content-format)).
   * @returns {Promise<Page>} On success, returns a [`Page`](https://telegra.ph/api#Page) object.
   * @example
   * const telegraph = new Telegraph(token)
   *
   * const content = [ { tag: 'p', children: [ 'Hello, world!' ] } ]
   * const page = await telegraph.createPage('Sample Page', content, 'Anonymous')
   *
   * const newContent = [ { tag: 'b', children: [ 'Hello, world!' ] } ]
   * const editedPage = await telegraph.editPage(page.path, 'Sample Page', newContent, 'Anonymous')
   */
  public editPage<R = Page>(path: string, title: string, content: Array<Node>, authorName?: string, authorUrl?: string, returnContent?: boolean): Promise<R> {
    return this.client.post(`editPage/${path}`, {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent,
    })
  }

  /**
   * Use this method to get a Telegraph page.
   * @see https://telegra.ph/api#getPage
   * @param {string} path **Required.** Path to the Telegraph page (in the format `Title-12-31`, i.e. everything that comes after `http://telegra.ph/`).
   * @param {boolean | undefined} returnContent If `true`, content field will be returned in Page object.
   * @returns {Promise<Page>} On success, returns a [`Page`](https://telegra.ph/api#Page) object.
   * @example
   * const telegraph = new Telegraph(token)
   * const page = await telegraph.getPage('Sample-Page-12-15', true)
   */
  public getPage<R = Page>(path: string, returnContent?: boolean): Promise<R> {
    return this.client.post(`getPage/${path}`, {
      access_token: this.options.token,
      return_content: returnContent,
    })
  }

  /**
   * Use this method to get the number of views for a Telegraph article. By default, the total number of page views will be returned
   * @see https://telegra.ph/api#getViews
   * @param {string} path **Required.** Path to the Telegraph page (in the format `Title-12-31`, where `12` is the month and `31` the day the article was first published).
   * @param {number | undefined} year Required if `month` is passed. If passed, the number of page views for the requested year will be returned.
   * @param {number | undefined} month Required if `day` is passed. If passed, the number of page views for the requested month will be returned.
   * @param {number | undefined} day Required if `hour` is passed. If passed, the number of page views for the requested day will be returned.
   * @param {number | undefined} hour If passed, the number of page views for the requested hour will be returned.
   * @returns {Promise<PageViews>} On success, returns a [`PageViews`](https://telegra.ph/api#PageViews) object.
   * @example
   * const telegraph = new Telegraph(token)
   * const views = await telegraph.getViews('Sample-Page-12-15', 2016, 12)
   */
  getViews(path: string): Promise<PageViews>
  getViews(path: string, year: number): Promise<PageViews>
  getViews(path: string, year: number, month: number): Promise<PageViews>
  getViews(path: string, year: number, month: number, day: number): Promise<PageViews>
  getViews(path: string, year: number, month: number, day: number, hour: number): Promise<PageViews>
  public getViews<R = PageViews>(path: string, year?: number, month?: number, day?: number, hour?: number): Promise<R> {
    return this.client.post(`getViews/${path}`, {
      access_token: this.options.token,
      year: year,
      month: month,
      day: day,
      hour: hour,
    })
  }

  /**
   * Use this method to get a list of pages belonging to a Telegraph account.
   * @see https://telegra.ph/api#getPageList
   * @param {number | undefined} offset Sequential number of the first page to be returned.
   * @param {number | undefined} limit Limits the number of pages to be retrieved.
   * @returns {Promise<PageList>} On success, returns a [`PageList`](https://telegra.ph/api#PageList) object.
   * @example
   * const telegraph = new Telegraph(token)
   * const pageList = await telegraph.getPageList(undefined, 3)
   */
  public getPageList<R = PageList>(offset?: number, limit?: number): Promise<R> {
    return this.client.post("getPageList", {
      access_token: this.options.token,
      offset: offset,
      limit: limit,
    })
  }

  /**
   * Use this method to revoke access_token and generate a new one, for example, if the user would like to reset all connected sessions, or you have reasons to believe the token was compromised.
   * @see https://telegra.ph/api#revokeAccessToken
   * @returns {Promise<Account>} On success, returns an [`Account`](https://telegra.ph/api#Account) object with new `access_token` and `auth_url` fields.
   */
  public revokeAccessToken<R = Account>(): Promise<R> {
    return this.client.post("revokeAccessToken", {
      access_token: this.options.token,
    })
  }
}
