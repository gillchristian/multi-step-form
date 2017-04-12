import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import rootReducer from '../reducers'
import rootEpic from '../epics'

const middlewares = [ createEpicMiddleware(rootEpic) ]
const enhancer = [ applyMiddleware(...middlewares) ]

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, ...enhancer)
}
