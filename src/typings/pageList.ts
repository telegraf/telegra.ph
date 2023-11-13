import type { Page } from "./page"
/**
 * This object represents a list of Telegraph articles belonging to an account. Most recently created articles first.
 * @see https://telegra.ph/api#PageList
 */
export interface PageList {
  /**
   * Total number of pages belonging to the target Telegraph account.
   */
  total_count: number
  /**
   * Requested pages of the target Telegraph account.
   */
  pages: Array<Page>
}
