import { FSA } from 'redux/api'
import { IBidsQuery } from 'entity/api'
import { appConfig } from 'config/appConfig'

// Action types
const LIST_LOADING = 'bids/LOADING'
const LIST_UPDATE = 'bids/UPDATE'
const LIST_LOAD_FAILED = 'bids/LOAD_FAILED'

// List actions
export function bidsLoading() {
  return { type: LIST_LOADING }
}

export function bidsUpdate(data, query: IBidsQuery) {
  return { type: LIST_UPDATE, payload: data, meta: { query } }
}

export function bidsLoadFailed(error) {
  return { type: LIST_LOAD_FAILED, payload: error, error: true }
}

export function bidsLoad(query: IBidsQuery) {
  return async dispatch => {
    dispatch(bidsLoading())

    let qs = ''
    if (query.after) {
      qs = '?after=' + query.after
    }
    return appConfig.httpClient
      .fetchJSON('/api/merchants/' + query.merchantId + '/bids' + qs, {
        method: 'GET'
      })
      .then(data => dispatch(bidsUpdate(data, query)))
      .catch(err => {
        dispatch(bidsLoadFailed(err))
      })
  }
}

// List selectors and reducer

export const bidsSelector = state => state.bidList.data

export const bidsQuerySelector = state => state.bidList.query

export const bidsProcessSelector = state => state.bidList.process

const bidsDefaultState = {
  state: {
    isLoading: true
  }
}

export function bidsReducer(state = bidsDefaultState, action: FSA<any, any>) {
  switch (action.type) {
    case LIST_LOADING:
      return Object.assign({}, state, { process: { isLoading: true } })
    case LIST_UPDATE:
      const data = action.meta.query.after ? state['data'] : []
      return {
        ...state,
        data: [...data, ...action.payload],
        query: action.meta.query,
        process: { isLoading: false },
        errors: null
      }
    case LIST_LOAD_FAILED:
      return {
        ...state,
        process: { isLoading: false },
        errors: action.payload
      }

    default:
      return state
  }
}
