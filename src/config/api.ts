import { History } from 'history'
import { IHTTPClient } from 'http/api'

export interface IAppConfig {
  httpClient: IHTTPClient
  history: History
}
