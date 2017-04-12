import R from 'ramda'
import { handleActions } from 'redux-actions'

import { ON_FIELD_CHANGE } from '../constants/action-types'

export const INITIAL_STATE = {
  a: [],
  b: '',
  text: '',
  c: '',
}

const handleFieldChange = (state, action) => R.evolve({
  [action.meta]: R.always(action.payload.value),
})(state)

const data = handleActions(
  {
    [ON_FIELD_CHANGE]: handleFieldChange,
  },
  INITIAL_STATE
)

export default data

// ----- SELECTORS -----
// getFormData :: State -> Object
export const getFormData = R.path(['form', 'data'])

// _getFieldValue :: State -> String -> a
const _getFieldValue = (state, fieldId) => getFormData(state)[fieldId]

// getFieldValue :: State -> (String -> a)
export const getFieldValue = R.curry(_getFieldValue)

