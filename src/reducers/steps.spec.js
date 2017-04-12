import { MOVE_TO_NEXT_STEP } from '../constants/action-types'
import { moveToNextStep } from '../actions/form'
import reducer, {
  INITIAL_STATE,
  isFinished,
  isCurrentStep,
  stepsCount,
  completedSteps,
} from './steps'

Object.freeze(INITIAL_STATE)

describe('form steps reducer', () => {

  describe(MOVE_TO_NEXT_STEP, () => {
    it('moves to the next step', () => {
      const state = reducer(INITIAL_STATE, moveToNextStep())

      expect(state).toMatchSnapshot()
    })

    it('does nothing if already in the last stpe', () => {
      const prevState = {
        current: 'submit',
        next: [],
        prev: [ 'a', 'b', 'text', 'c' ],
      }

      const state = reducer(prevState, moveToNextStep())

      expect(state).toEqual(prevState)
    })
  })

})

describe('form steps selectors', () => {
  const state = { form: { steps: INITIAL_STATE } }

  describe('isFinished', () => {
    it('check if the current step is submit', () => {
      expect(isFinished(state)).toBe(false)
      expect(isFinished({ form: { steps: { current: 'submit' } } })).toBe(true)
    })
  })

  describe('isCurrentStep', () => {
    it('check if the provided step is the current', () => {
      expect(isCurrentStep(state, 'a')).toBe(true)
      expect(isCurrentStep(state, 'b')).toBe(false)
    })
  })

  describe('stepsCount', () => {
    it('calculates the total amount of steps', () => {
      expect(stepsCount(state)).toBe(4)
    })
  })

  describe('completedSteps', () => {
    it('calculates the amount of completed steps', () => {
      expect(completedSteps(state)).toBe(0)

      const _state = {
        form: {
          steps: { current: 'text', prev: ['a', 'b'], next: ['c', 'submit'] },
        },
      }
      expect(completedSteps(_state)).toBe(2)
    })
  })

})
