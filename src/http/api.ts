export interface IHTTPClient {
  fetchJSON<T>(url: string, options: object): Promise<T>
}
