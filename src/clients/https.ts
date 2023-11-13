import type { Client } from "./"
import https from "https"

export class HTTPS implements Client {
  constructor(public baseURL: string) {}

  protected request<R = unknown>(method: string, path: string, data: unknown): Promise<R> {
    return new Promise((resolve, reject) => {
      const req = https.request(
        `${this.baseURL}${path}`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
        },
        (res) => {
          let body = ""
          res.on("data", (chunk) => {
            body += chunk
          })
          res.on("end", () => {
            try {
              const obj = JSON.parse(body)
              if (obj.ok === false) {
                if (obj.error) reject(new Error(obj.error))
                else reject(new Error(obj))
              }
              if (obj.result) resolve(obj.result)
              else resolve(obj)
            } catch (err) {
              reject(err)
            }
          })
        }
      )
      req.on("error", reject)
      req.write(JSON.stringify(data))
      req.end()
    })
  }

  post<R = unknown>(path: string, data: unknown): Promise<R> {
    return this.request("POST", path, data)
  }

  get<R = unknown>(path: string, data: unknown): Promise<R> {
    return this.request("GET", path, data)
  }
}
