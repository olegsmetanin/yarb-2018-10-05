import { IMerchant, IMerchantCreateRequest, IMerchantQuery, IMerchantsQuery } from 'entity/api'

import { FSA } from 'redux/api'
import { appConfig } from 'config/appConfig'

// Action types
const LIST_LOADING = 'merchants/LOADING'
const LIST_UPDATE = 'merchants/UPDATE'
const LIST_LOAD_FAILED = 'merchants/LOAD_FAILED'

const ITEM_UPDATE = 'merchant/UPDATE'
const ITEM_LOADING = 'merchant/LOADING'
const ITEM_SAVING = 'merchant/SAVING'
const ITEM_DELETING = 'merchant/DELETING'
const ITEM_DELETE = 'merchant/DELETE'
const ITEM_FAILED = 'merchant/FAILED'

// List actions
export function merchantsLoading() {
  return { type: LIST_LOADING }
}

export function merchantsUpdate(data, after: string) {
  return { type: LIST_UPDATE, payload: data, meta: { after } }
}

export function merchantsLoadFailed(error) {
  return { type: LIST_LOAD_FAILED, payload: error, error: true }
}

export function merchantsLoad(query: IMerchantsQuery) {
  return async dispatch => {
    dispatch(merchantsLoading())

    let qs = ''
    if (query.after) {
      qs = '?after=' + query.after
    }
    return appConfig.httpClient
      .fetchJSON('/api/merchants' + qs, {
        method: 'GET'
      })
      .then(data => dispatch(merchantsUpdate(data, query.after)))
      .catch(err => {
        dispatch(merchantsLoadFailed(err))
      })
  }
}

// Item actions
export function merchantLoading() {
  return { type: ITEM_LOADING }
}

export function merchantSaving() {
  return { type: ITEM_SAVING }
}

export function merchantDeleting(id: string) {
  return { type: ITEM_DELETING, payload: id }
}

export function merchantDeleted(id: string) {
  return { type: ITEM_DELETE, payload: id }
}

export function merchantUpdate(data) {
  return { type: ITEM_UPDATE, payload: data }
}

export function merchantFailed(error) {
  return { type: ITEM_FAILED, payload: error, error: true }
}

export function merchantLoad(query: IMerchantQuery) {
  return async dispatch => {
    dispatch(merchantLoading())

    return appConfig.httpClient
      .fetchJSON('/api/merchants/' + query.merchantId, {
        method: 'GET'
      })
      .then(data => dispatch(merchantUpdate(data)))
      .catch(err => {
        dispatch(merchantFailed(err))
      })
  }
}

export function merchantCreate(value: IMerchantCreateRequest) {
  return async () => {
    return appConfig.httpClient.fetchJSON('/api/merchants', {
      method: 'POST',
      body: JSON.stringify(value)
    })
  }
}

export function merchantSave(value: IMerchant) {
  return async dispatch => {
    dispatch(merchantSaving())

    return appConfig.httpClient
      .fetchJSON('/api/merchants/' + value.id, {
        method: 'PUT',
        body: JSON.stringify(value)
      })
      .then(() => dispatch(merchantUpdate(value)))
      .catch(err => {
        dispatch(merchantFailed(err))
      })
  }
}

export function merchantDelete(id: string) {
  return async dispatch => {
    dispatch(merchantDeleting(id))

    return appConfig.httpClient
      .fetchJSON('/api/merchants/' + id, {
        method: 'DELETE'
      })
      .then(() => dispatch(merchantDeleted(id)))
      .catch(err => {
        console.log('errr', err)
        dispatch(merchantFailed(err))
      })
  }
}

// List selectors and reducer

export const merchantsSelector = state => state.merchantList.data
export const merchantsStateSelector = state => state.merchantList.state

const merchantsDefaultState = {
  state: {
    isLoading: true
  }
}

export function merchantsReducer(state = merchantsDefaultState, action: FSA<any, any>) {
  switch (action.type) {
    case LIST_LOADING:
      return Object.assign({}, state, { state: { isLoading: true } })
    case LIST_UPDATE:
      var data = action.meta.after ? state['data'] : []
      return {
        ...state,
        data: [...data, ...action.payload],
        state: { isLoading: false, error: null }
      }
    case LIST_LOAD_FAILED:
      return {
        ...state,
        state: { isLoading: false, error: action.payload }
      }
    case ITEM_UPDATE:
      let index = state['data'].findIndex(el => el.id === action.payload.id)
      if (index === -1) {
        return state
      } else {
        data = state['data']
        return {
          ...state,
          data: [...data.slice(0, index), action.payload, ...data.slice(index + 1, data.length - 1)]
        }
      }
    case ITEM_DELETE:
      return {
        data: state['data'].filter(el => el.id !== action.payload),
        state: { error: null }
      }
    default:
      return state
  }
}

// Item selectors and reducer
export const merchantSelector = state => state.merchant.data
export const merchantStateSelector = state => state.merchant.state

const merchantDefaultState = {
  state: {
    isLoading: true
  }
}

export function merchantReducer(state = merchantDefaultState, action: FSA<any, any>) {
  switch (action.type) {
    case ITEM_LOADING:
      return Object.assign({}, state, { state: { isLoading: true } })
    case ITEM_SAVING:
      return Object.assign({}, state, { state: { isSaving: true } })
    case ITEM_DELETING:
      return Object.assign({}, state, { state: { isDeleting: true } })
    case ITEM_UPDATE:
      return Object.assign({}, state, {
        data: action.payload,
        state: { isLoading: false, isSaving: false, error: null }
      })
    case ITEM_DELETE:
      return { state: { isLoading: true } }
    case ITEM_FAILED:
      return Object.assign({}, state, {
        state: { isLoading: false, error: action.payload }
      })
    default:
      return state
  }
}
