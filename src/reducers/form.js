import { combineReducers } from 'redux'

import steps from './steps'
import data from './data'
import validation from './validation'
import submition from './submition'

export default combineReducers({
  steps,
  data,
  validation,
  submition,
})

