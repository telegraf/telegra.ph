export interface Account {
  short_name: string
  author_name: string
  author_url?: string
  access_token?: string
  auth_url?: string
  page_count?: number
}

export interface PageList {
  total_count: number
  pages: Array<Page>
}

export interface Page {
  path: string
  url: string
  title: string
  description: string
  author_name?: string
  author_url?: string
  image_url?: string
  content?: Array<Node>
  views: number
  can_edit?: boolean
}

export interface PageViews {
  views: number
}

export type Node = string | NodeElement

export interface NodeElement {
  tag: 'a' | 'aside' | 'b' | 'blockquote' | 'br' | 'code' | 'em' | 'figcaption' | 'figure' | 'h3' | 'h4' | 'hr' | 'i' | 'iframe' | 'img' | 'li' | 'ol' | 'p' | 'pre' | 's' | 'strong' | 'u' | 'ul' | 'video'
  attrs?: {
    href?: string
    src?: string
  }
  children?: Array<Node> | string
}