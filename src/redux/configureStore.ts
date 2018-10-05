import { createStore, compose, applyMiddleware } from 'redux'
import { reducers } from './reducers'
import ReduxThunk from 'redux-thunk'

const composeEnhancers =
  (process.env.NODE_ENV === 'development' && window && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) || compose

export const configureStore = (preloadedState?: object) => {
  const middlewares = [ReduxThunk]
  // compose enhancers
  const enhancer = composeEnhancers(applyMiddleware(...middlewares))

  return createStore(reducers, preloadedState, enhancer)
}
