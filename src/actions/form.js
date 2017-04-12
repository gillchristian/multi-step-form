import { createAction } from 'redux-actions'

import {
  SUBMIT_FORM_BEGIN,
  SUBMIT_FORM_END,
  VALIDATE_FIELD_BEGIN,
  VALIDATE_FIELD_END,
  ON_FIELD_CHANGE,
  MOVE_TO_NEXT_STEP,
} from '../constants/action-types'

// FSA :: Flux Standard Action @link https://goo.gl/Tdu4BA

// submitForm :: () -> FSA
export const submitForm = createAction(SUBMIT_FORM_BEGIN)
// submitFormEnd :: a -> FSA
export const submitFormEnd = createAction(SUBMIT_FORM_END)

// validateAsyncBegin :: String -> (() -> FSA)
export const validateAsyncBegin =
  field => createAction(VALIDATE_FIELD_BEGIN, () => {}, () => field)

// validateAsyncEnd :: String -> (a -> FSA)
export const validateAsyncEnd =
  field => createAction(VALIDATE_FIELD_END, p => p, () => field)

// moveToNextStep :: () -> FSA
export const moveToNextStep = createAction(MOVE_TO_NEXT_STEP)

// onFieldChange :: String -> String -> FSA
export const onFieldChange = createAction(
  ON_FIELD_CHANGE,
  (field, value) => ({value}),
  (field) => field
)

