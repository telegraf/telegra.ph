export interface Client {
  post: <R>(path: string, data: unknown) => Promise<R>
  get: <R>(path: string, data: unknown) => Promise<R>
}

export { Fetch } from "./fetch"
export { HTTPS } from "./https"
