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
import createHashHistory from 'history/createHashHistory'
import { register as registerServiceWorker } from './registerServiceWorker'
import { setAppConfig } from 'config/appConfig'

// TODO: make typescript code ready for "strict": true

// Poor man Dependency Injection
setAppConfig({
  // Standard fetch implementation
  // httpClient: new Fetch(),
  httpClient: new InMemoryFetch(new InMemoryDB()),
  // History API
  history: createHashHistory({
    basename: '', // The base URL of the app
    hashType: 'slash', // The hash type to use
    // A function to use to confirm navigation with the user
    getUserConfirmation: (message, callback) => callback(window.confirm(message))
  })
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()
