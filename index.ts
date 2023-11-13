import type { Account, Node, Page, PageList, PageViews } from "./typings"
import fetch from "isomorphic-fetch"

export type Options = {
  token: string
  apiRoot: string
}

export class Telegraph {
  private options: Options

  constructor(token: string, opts: Options) {
    this.options = Object.assign(
      {
        token: token,
        apiRoot: "https://api.telegra.ph",
      },
      opts
    )
  }
  
  protected callService<R = unknown>(method: string, payload: unknown): Promise<R> {
    return fetch(`${this.options.apiRoot}/${method}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    }).then(unwrap)
  }

  public set token(token: string) {
    this.options.token = token
  }

  public createAccount(shortName: string, name: string, url?: string): Promise<Account> {
    return this.callService("createAccount", {
      short_name: shortName,
      author_name: name,
      author_url: url,
    })
  }

  public createPage(title: string, content: Array<Node>, authorName: string, authorUrl?: string, returnContent?: boolean): Promise<Page> {
    return this.callService("createPage", {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent,
    })
  }

  public editAccountInfo(shortName: string | undefined = undefined, name: string | undefined = undefined, url: string | undefined = undefined): Promise<Account> {
    return this.callService("editAccountInfo", {
      access_token: this.options.token,
      short_name: shortName,
      author_name: name,
      author_url: url,
    })
  }

  public editPage(path: string, title: string, content: Array<Node>, authorName?: string, authorUrl?: string, returnContent?: boolean): Promise<Page> {
    return this.callService(`editPage/${path}`, {
      access_token: this.options.token,
      title: title,
      author_name: authorName,
      author_url: authorUrl,
      content: content,
      return_content: returnContent,
    })
  }

  public getPage(path: string, returnContent?: boolean): Promise<Page> {
    return this.callService(`getPage/${path}`, {
      access_token: this.options.token,
      return_content: returnContent,
    })
  }

  getViews(path: string): Promise<PageViews>
  getViews(path: string, year: number): Promise<PageViews>
  getViews(path: string, year: number, month: number): Promise<PageViews>
  getViews(path: string, year: number, month: number, day: number): Promise<PageViews>
  getViews(path: string, year: number, month: number, day: number, hour: number): Promise<PageViews>
  public getViews(path: string, year?: number, month?: number, day?: number, hour?: number): Promise<PageViews> {
    return this.callService(`getViews/${path}`, {
      access_token: this.options.token,
      year: year,
      month: month,
      day: day,
      hour: hour,
    })
  }

  public getPageList(offset?: number, limit?: number): Promise<PageList> {
    return this.callService("getPageList", {
      access_token: this.options.token,
      offset: offset,
      limit: limit,
    })
  }

  public revokeAccessToken() {
    return this.callService("revokeAccessToken", {
      access_token: this.options.token,
    })
  }
}

function unwrap(res) {
  if (!res.ok) {
    const err: Error & { statusCode?: any } = new Error(res.statusText || "Error calling telegra.ph")
    err.statusCode = res.status
    throw err
  }
  return res.json().then((json) => {
    if ("ok" in json && !json.ok) {
      throw new Error(json.error || "Error calling telegra.ph")
    }
    return json.result
  })
}
