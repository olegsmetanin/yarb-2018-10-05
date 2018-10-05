/// <reference path='./index.d.ts'/>

import './index.css'
import './polyfills'

import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { InMemoryDB } from 'db/InMemoryDB'
import { InMemoryFetch } from 'http/InMemoryFetch'
import { Provider } from 'react-redux'
import { Routes } from 'routes/routes'
import { configureStore } from 'redux/configureStore'
import createBrowserHistory from 'history/createBrowserHistory'
import { register as registerServiceWorker } from './registerServiceWorker'
import { setAppConfig } from 'config/appConfig'

// TODO: make typescript code ready for "strict": true

// Poor man Dependency Injection
setAppConfig({
  // Standard fetch implementation
  // httpClient: new Fetch(),
  httpClient: new InMemoryFetch(new InMemoryDB()),
  // History API
  history: createBrowserHistory()
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
