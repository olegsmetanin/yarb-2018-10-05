import ReduxThunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { merchantsLoad } from './redux'

jest.mock('config/appConfig', () => ({
  appConfig: {
    httpClient: {
      fetchJSON: ({}, {}) => {
        return Promise.resolve([1])
      }
    }
  }
}))

it('creates merchants/UPDATE when fetching merchants has been done', () => {
  const mockStore = configureStore([ReduxThunk])
  const store = mockStore({})

  const expectedActions = [
    { type: 'merchants/LOADING' },
    {
      type: 'merchants/UPDATE',
      payload: [1],
      meta: { after: 'qwe123' }
    }
  ]

  store
    .dispatch(merchantsLoad({
      sort: 'created',
      after: 'qwe123'
    }) as any)
    .then(() => {
      const actions = store.getActions()
      expect(actions).toEqual(expectedActions)
    })
})
