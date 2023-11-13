import { NodeElement } from "./nodeElement"
/**
 * This abstract object represents a DOM Node. It can be a String which represents a DOM text node or a NodeElement object.
 * @see https://telegra.ph/api#Node
 */
export type Node = string | NodeElement
