import {
  ON_FIELD_CHANGE,
  VALIDATE_FIELD_BEGIN,
  VALIDATE_FIELD_END,
} from '../constants/action-types'
import {
  onFieldChange,
  validateAsyncBegin,
  validateAsyncEnd,
} from '../actions/form'
import reducer, { INITIAL_STATE } from './validation'

Object.freeze(INITIAL_STATE)

describe('form validation reducer', () => {

  describe(ON_FIELD_CHANGE, () => {
    it('sets the field to pristine unless it is the "text" field', () => {
      let state = reducer(INITIAL_STATE, onFieldChange('a', ['A1']))

      expect(INITIAL_STATE.a.pristine).toBe(true)
      expect(state.a.pristine).toBe(false)

      state = reducer(INITIAL_STATE, onFieldChange('text', 'some text'))

      expect(INITIAL_STATE.text.pristine).toBe(true)
      expect(state.text.pristine).toBe(true)
    })
  })

  describe(VALIDATE_FIELD_BEGIN, () => {
    it('sets a field to loading', () => {
      const state = reducer(INITIAL_STATE, validateAsyncBegin('text')())

      expect(INITIAL_STATE.text.loading).toBe(false)
      expect(state.text.loading).toBe(true)
    })
  })

  describe(VALIDATE_FIELD_END, () => {
    it('update field validation values on success', () => {
      let state = reducer(INITIAL_STATE, validateAsyncBegin('text')())
      state = reducer(state, validateAsyncEnd('text')({ message: 'Yay!' }))

      expect(state.text.pristine).toBe(false)
      expect(state.text.loading).toBe(false)
      expect(state.text.error).toBe(false)
      expect(state.text.message).toBe('Yay!')
    })

    it('update field validation values on error', () => {
      let state = reducer(INITIAL_STATE, validateAsyncBegin('text')())
      state = reducer(state, validateAsyncEnd('text')(new Error('Yak')))

      expect(state.text.pristine).toBe(false)
      expect(state.text.loading).toBe(false)
      expect(state.text.error).toBe(true)
      expect(state.text.message).toBe('Yak')
    })
  })

})
