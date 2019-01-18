import * as tph from './telegraph.d'

export interface Telegraph {

  token: string

  callService <T>(method: string, payload: object): Promise<T>

  createAccount (shortName: string, name?: string, url?: string): Promise<tph.Account>

  createPage (title: string, content: Array<tph.Node>, authorName?: string, authorUrl?: string, returnContent?: boolean): Promise<tph.Page>

  editAccountInfo (shortName?: string, name?: string, url?: string): Promise<tph.Account>

  editPage (path: string, title: string, content: Array<tph.Node>, authorName?: string, authorUrl?: string, returnContent?: boolean): Promise<tph.Page>

  getPage (path: string, returnContent?: boolean): Promise<tph.Page>

  getViews (path: string, year: number, month: number, day: number, hour?: number): Promise<tph.PageViews>
  
  getPageList (offset?: number, limit?: number): Promise<tph.PageList>

  revokeAccessToken (): Promise<tph.Account>
}


export interface TelegraphConstructor {
  /**
   * Initialize new Telegraph app.
   * @param token Access token
   * @param opts options
   * @example
   * new Telegraph(token, opts)
   */
  new (token: string, options?: TelegraphOptions): Telegraph
}

export interface TelegraphOptions {

  token?: string

  apiRoot?: string

}

export const Telegraph: TelegraphConstructor

export default Telegraph