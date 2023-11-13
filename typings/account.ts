/**
 * This object represents a Telegraph account.
 * @see https://telegra.ph/api#Account
 */
export interface Account {
  /**
   * Account name, helps users with several accounts remember which they are currently using. Displayed to the user above the "Edit/Publish" button on Telegra.ph, other users don't see this name.
   */
  short_name: string
  /**
   * Default author name used when creating new articles.
   */
  author_name: string
  /**
   * Default profile link, opened when users click on the author's name below the title. Can be any link, not necessarily to a Telegram profile or channel.
   */
  author_url?: string
  /**
   * Optional. Only returned by the `createAccount` and `revokeAccessToken` method. Access token of the Telegraph account.
   */
  access_token?: string
  /**
   * Optional. URL to authorize a browser on telegra.ph and connect it to a Telegraph account. This URL is valid for only one use and for 5 minutes only.
   */
  auth_url?: string
  /**
   * Optional. Number of pages belonging to the Telegraph account.
   */
  page_count?: number
}
