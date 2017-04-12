import R from 'ramda'
import { Observable } from 'rxjs'

import {
  ON_FIELD_CHANGE,
  VALIDATE_FIELD_BEGIN,
  VALIDATE_FIELD_END,
  SUBMIT_FORM_BEGIN,
} from '../constants/action-types'
import * as api from '../api/index'
import { submitFormEnd,
  moveToNextStep,
  validateAsyncEnd,
} from '../actions/form'
import { getFieldValue, getFormData } from '../reducers/data'
import { isCurrentStep } from '../reducers/steps'

// checkIt :: State -> String -> Observable(Promise)
const checkIt = R.compose(
  Observable.fromPromise,
  api.checkIt,
  getFieldValue
)

// submitIt :: State -> Observable(Promise)
const submitIt = R.compose(
  Observable.fromPromise,
  api.submitIt,
  getFormData
)

// handleCheckError :: Error -> Observable(FSA)
const handleCheckError = R.compose(
  Observable.of,
  validateAsyncEnd('text')
)

// handleSubmitError :: Error -> Observable(FSA)
const handleSubmitError = R.compose(
  Observable.of,
  submitFormEnd
)

// syncTypes :: FSA -> Bool
const syncTypes = ({ type, error, meta }) =>
  (type === ON_FIELD_CHANGE && meta !== 'text') ||
  (type === VALIDATE_FIELD_END && !error)

// nextStepEpic handles transition to the next step in the form
export const nextStepEpic = (action$, { getState }) => action$
  .filter(syncTypes)
  .filter(({ meta }) => isCurrentStep(getState(), meta))
  .mapTo(moveToNextStep())

// asyncValidationEpic handles async validation of the text field
export const asyncValidationEpic = (action$, { getState }) => action$
  .ofType(VALIDATE_FIELD_BEGIN)
  .filter(R.compose(R.equals('text'), R.prop('meta')))
  .mergeMap(
    () => checkIt(getState(), 'text')
      .map(validateAsyncEnd('text'))
      .catch(handleCheckError)
  )

// syncValidationEpic handles sync validation whenever a field changes
export const syncValidationEpic = (action$) => action$
  .ofType(ON_FIELD_CHANGE)
  .filter(({ meta }) => meta !== 'text')
  .map(R.ifElse(
    R.compose(R.isEmpty, R.path(['payload', 'value' ])),
    ({meta}) => validateAsyncEnd(meta)(new Error('Please pick one')),
    ({meta}) => validateAsyncEnd(meta)()
  ))

// submitEpic handles form submition
export const submitEpic = (action$, { getState }) => action$
  .ofType(SUBMIT_FORM_BEGIN)
  .mergeMap(
    () => submitIt(getState())
      .mapTo(submitFormEnd())
      .catch(handleSubmitError)
  )

