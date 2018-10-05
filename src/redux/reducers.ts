import { merchantReducer, merchantsReducer } from 'forms/merchant/redux'

import { bidsReducer } from 'forms/bid/redux'
import { combineReducers } from 'redux'

export const reducers = combineReducers({
  merchantList: merchantsReducer,
  merchant: merchantReducer,
  bidList: bidsReducer
})
