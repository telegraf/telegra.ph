import { Client } from "./index"

export class Fetch implements Client {
  constructor(public baseURL: string) {}

  async get<R = unknown>(path: string): Promise<R> {
    const response = await fetch(`${this.baseURL}${path}`)
    const json = await response.json()
    if (json.ok === false) {
      if (json.error) throw new Error(json.error)
      else throw new Error(json)
    }
    if (json.result) return json.result
    else return json
  }

  async post<R = unknown>(path: string, body: unknown): Promise<R> {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
    const json = await response.json()
    if (json.ok === false) {
      if (json.error) throw new Error(json.error)
      else throw new Error(json)
    }
    if (json.result) return json.result
    else return json
  }
}
