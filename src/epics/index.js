import { combineEpics } from 'redux-observable'

import {
  nextStepEpic,
  asyncValidationEpic,
  syncValidationEpic,
  submitEpic,
} from './form'

export default combineEpics(
  nextStepEpic,
  asyncValidationEpic,
  syncValidationEpic,
  submitEpic
)

