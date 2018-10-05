import { IAppConfig } from 'config/api'

export var appConfig: IAppConfig

export function setAppConfig(config) {
  appConfig = { ...appConfig, ...config }
}
