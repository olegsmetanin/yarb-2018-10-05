import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { AppLayout } from './AppLayout'

it('renders without crashing', () => {
  //fetch()
  const div = document.createElement('div')
  ReactDOM.render(<AppLayout />, div)
})
