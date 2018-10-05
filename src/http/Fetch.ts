import { IHTTPClient } from 'http/api'

export class Fetch implements IHTTPClient {
  fetchJSON = (url: string, options: object) => {
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      ...options
    }).then(response => response.json())
  }
}
