import R from 'ramda'
import { handleActions } from 'redux-actions'
import { createSelector } from 'reselect'

import { SUBMIT_FORM_BEGIN, SUBMIT_FORM_END } from '../constants/action-types'

const INITIAL_STATE = {
  isSubmitting: false,
  error: false,
  didSubmit: false,
  message: '',
}

// submition :: State -> FSA -> State
const submition = handleActions({
  [SUBMIT_FORM_BEGIN]: R.evolve({
    isSubmitting: R.T,
    didSubmit: R.T,
  }),
  [SUBMIT_FORM_END]: (state, { error, payload }) => R.evolve({
    isSubmitting: R.F,
    error: () => Boolean(error),
    message: () => error ? payload.message : 'Yay submitting succeded!',
  })(state),
}, INITIAL_STATE)

export default submition

// ----- SELECTORS -----
// getFormSubmitionState :: State -> Object
export const getFormSubmitionState = state => state.form.submition

// isFormSubmitting :: State -> Bool
export const isFormSubmitting = createSelector(
  getFormSubmitionState, submition => submition.isSubmitting
)

// didFormSubmit :: State -> Bool
export const didFormSubmit = createSelector(
  getFormSubmitionState, submition => submition.didSubmit
)

// getSubmitionMessage :: State -> String
export const getSubmitionMessage = createSelector(
  getFormSubmitionState, submition => submition.message
)

// didSubmitionFailed :: State -> Bool
export const didSubmitionFailed = createSelector(
  getFormSubmitionState, submition => submition.error
)

