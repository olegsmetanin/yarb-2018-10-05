import * as pathToRegexp from 'path-to-regexp'
import * as qs from 'qs'

import { IDB } from 'db/api'
import { IHTTPClient } from 'http/api'

export interface MiddlwareHandler {
  (/* url: string, */ params: any): Promise<any>
}

export class InMemoryFetch implements IHTTPClient {
  middlewares: Array<{
    method: string
    keys: string[]
    route: RegExp
    handler: MiddlwareHandler
  }> = []

  constructor(private db: IDB) {
    this
      // Get merchants
      .addRoute('GET', '/api/merchants', this.handleMerchantsGet)
      // New merchant
      .addRoute('POST', '/api/merchants', this.handleMerchantCreate)
      // Get merchant
      .addRoute('GET', '/api/merchants/:merchantId', this.handleMerchantGet)
      // Save merchant
      .addRoute('PUT', '/api/merchants/:merchantId', this.handleMerchantSave)
      // Delete merchant
      .addRoute('DELETE', '/api/merchants/:merchantId', this.handleMerchantDelete)
      // Get bids
      .addRoute('GET', '/api/merchants/:merchantId/bids', this.handleMerchantBids)
  }

  handleMerchantsGet = (/* url, */ params) => {
    return this.db.getMerchants({
      sort: params['sort'],
      after: params['after']
    })
  }

  handleMerchantGet = params => {
    return this.db.getMerchant({
      merchantId: params['merchantId']
    })
  }

  handleMerchantSave = params => {
    return this.db.merchantSave(params['body'])
  }

  handleMerchantDelete = params => {
    return this.db.merchantDelete(params['merchantId'])
  }

  handleMerchantCreate = params => {
    return this.db.merchantCreate(params['body'])
  }

  handleMerchantBids = params => {
    return this.db.merchantBidsGet({
      merchantId: params['merchantId'],
      sort: params['sort'],
      after: params['after']
    })
  }

  fetchJSON = <T>(url: string, options: object): Promise<T> => {
    const urlPath = url.indexOf('?') === -1 ? url : url.slice(0, url.indexOf('?'))

    console.log('fetch', url, urlPath, options)

    const found = this.middlewares.find(mw => {
      return options['method'] === mw.method && mw.route.test(urlPath)
    })

    if (found) {
      let routeParams = {}
      const parsedParams = found.route.exec(urlPath)

      for (let i = 1; i < parsedParams.length; i++) {
        routeParams[found.keys[i - 1]['name']] = parsedParams[i]
      }

      const queryParams = url.indexOf('?') === -1 ? {} : qs.parse(url.slice(url.indexOf('?') + 1))
      const bodyParams = { body: JSON.parse(options['body'] || '{}') }

      const res = found.handler(
        /* url, */ {
          ...routeParams,
          ...queryParams,
          ...bodyParams
        }
      )

      return res
    } else {
      throw new Error('Not implemented')
    }
  }

  addRoute = (method: string, path: string, handler: MiddlwareHandler) => {
    var keys = []
    const route = pathToRegexp(path, keys, { end: true })
    this.middlewares.push({
      method,
      keys,
      route,
      handler
    })
    return this
  }
}
