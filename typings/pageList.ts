import type { Page } from "./page"
export interface PageList {
  total_count: number
  pages: Array<Page>
}
