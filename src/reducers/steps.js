import R from 'ramda'
import { handleActions } from 'redux-actions'
import { createSelector } from 'reselect'

import { MOVE_TO_NEXT_STEP } from '../constants/action-types'

export const INITIAL_STATE = {
  current: 'a',
  next: [ 'b', 'text', 'c', 'submit' ],
  prev: [ ],
}

const moveToNextStep = R.ifElse(
  R.compose(R.isEmpty, R.prop('next')),
  R.identity,
  state => ({
    current: R.head(state.next),
    next: R.tail(state.next),
    prev: R.append(state.current, state.prev),
  })
)

// steps :: State -> FSA -> State
const steps = handleActions(
  {
    [MOVE_TO_NEXT_STEP]: moveToNextStep,
  },
  INITIAL_STATE
)

export default steps

// ----- SELECTORS -----
// getStepsState :: State -> Object
export const getStepsState = R.path(['form', 'steps'])

// getCurrentStep :: State -> String
export const getCurrentStep = createSelector(
  getStepsState, (steps) => steps.current
)

// getNextSteps :: State -> [String]
export const getNextSteps = createSelector(
  getStepsState, (steps) => steps.next
)

// getPrevSteps :: State -> [String]
export const getPrevSteps = createSelector(
  getStepsState, (steps) => steps.prev
)

// isFinished :: State -> Bool
export const isFinished = createSelector(
  getCurrentStep, (current) => current === 'submit'
)

// isCurrentStep :: State -> String -> Bool
export const isCurrentStep = (state, stepId) =>
  getCurrentStep(state) === stepId

// stepsCount :: State -> Int
export const stepsCount = createSelector(
  [getNextSteps, getPrevSteps], (next, prev) => next.length + prev.length
)

// completedSteps :: State -> Int
export const completedSteps = createSelector(
  getPrevSteps, (prev) => prev.length
)

// _shouldDisplayStep :: State -> String -> Bool
const _shouldDisplayStep = (state, stepId) =>
  getPrevSteps(state).includes(stepId) || getCurrentStep(state) === stepId

// _shouldDisplayStep :: State -> (String -> Bool)
export const shouldDisplayStep = R.curry(_shouldDisplayStep)

