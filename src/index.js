import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'rxjs'

import configureStore from './store'
import { App } from './components'
import './styles/global-styles'


render(
  <Provider store={configureStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
)
