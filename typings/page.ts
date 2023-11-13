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
