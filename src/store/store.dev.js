import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from '../reducers'
import rootEpic from '../epics'

export default function configureStore(initialState = {}) {
  const middlewares = [ createEpicMiddleware(rootEpic) ]

  const enhancers = [ applyMiddleware(...middlewares) ]

  const composeEnhancers = composeWithDevTools({/* other enhancers */})

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      // eslint-disable-line global-require
      const nextReducer = require('../reducers').default
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
