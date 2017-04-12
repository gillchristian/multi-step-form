import R from 'ramda'
import { createSelector } from 'reselect'
import { handleActions } from 'redux-actions'

import {
  ON_FIELD_CHANGE,
  VALIDATE_FIELD_BEGIN,
  VALIDATE_FIELD_END,
} from '../constants/action-types'
import { getFormData } from './data'

const pristineField = {
  pristine: true,
  error: true,
  loading: false,
  message: '',
}

export const INITIAL_STATE = {
  a: { ...pristineField },
  b: { ...pristineField },
  text: { ...pristineField },
  c: { ...pristineField },
}

// begin :: State -> FSA -> State
const begin = (state, { meta }) => R.evolve({
  [meta]: R.evolve({ loading: R.T }),
})(state)

// end :: State -> FSA -> State
const end = (state, action) => R.evolve({
  [action.meta]: (v) => ({
    pristine: false,
    error: Boolean(action.error),
    loading: false,
    message: R.path(['payload', 'message'], action),
  }),
})(state)

// validation :: State -> FSA -> State
const validation = handleActions(
  {
    [VALIDATE_FIELD_BEGIN]: begin,
    [VALIDATE_FIELD_END]: end,
    [ON_FIELD_CHANGE]: (state, { meta }) => R.evolve({
      [meta]: R.evolve({ pristine: (v) => v && meta === 'text' }),
    })(state),
  },
  INITIAL_STATE
)

export default validation

// ----- SELECTORS -----
// getValidationState :: State -> Object
export const getValidationState = state => state.form.validation

// getFieldStatus :: State -> String -> Object
export const getFieldStatus =
  (state, filedId) => getValidationState(state)[filedId]

// isFieldValidating :: State -> (String -> Bool)
export const isFieldValidating = R.curry(
  (state, field) => getFieldStatus(state, field).loading
)

// getFieldError :: State -> (String -> String)
export const getFieldError = R.curry(
  (state, field) => getFieldStatus(state, field).message
)

// fieldHasError :: State -> (String -> Bool)
export const fieldHasError = R.curry(
  (state, field) => getFieldStatus(state, field).error
)

// isFieldPristine :: State -> (String -> Bool)
export const isFieldPristine = R.curry(
  (state, field) => getFieldStatus(state, field).pristine
)

// _isFormValid :: Object -> Object -> Bool
const _isFormValid = (fields, validation) =>
  Object.keys(fields).reduce(
    (acc, key) => !R.path([key, "error"], validation) && acc,
    true
  )

// isFormValid :: State -> Bool
export const isFormValid = createSelector(
  [getFormData, getValidationState], _isFormValid
)

