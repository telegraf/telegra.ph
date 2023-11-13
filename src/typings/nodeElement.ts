import { Node } from "./node"
/**
 * This object represents a DOM element node.
 * @see https://telegra.ph/api#NodeElement
 */
export interface NodeElement {
  /**
   * Name of the DOM element. Available tags: `a`, `aside`, `b`, `blockquote`, `br`, `code`, `em`, `figcaption`, `figure`, `h3`, `h4`, `hr`, `i`, `iframe`, `img`, `li`, `ol`, `p`, `pre`, `s`, `strong`, `u`, `ul`, `video`.
   */
  tag:
    | "a"
    | "aside"
    | "b"
    | "blockquote"
    | "br"
    | "code"
    | "em"
    | "figcaption"
    | "figure"
    | "h3"
    | "h4"
    | "hr"
    | "i"
    | "iframe"
    | "img"
    | "li"
    | "ol"
    | "p"
    | "pre"
    | "s"
    | "strong"
    | "u"
    | "ul"
    | "video"
  /**
   * Optional. Attributes of the DOM element. Key of object represents name of attribute, value represents value of attribute. Available attributes: `href`, `src`.
   */
  attrs?: {
    href?: string
    src?: string
  }
  /**
   * Optional. List of child nodes for the DOM element.
   */
  children?: Array<Node> | string
}
