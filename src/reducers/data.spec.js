import { ON_FIELD_CHANGE } from '../constants/action-types'

import reducer, {
  getFormData,
  getFieldValue,
  INITIAL_STATE,
} from './data'
import { onFieldChange } from '../actions/form'

Object.freeze(INITIAL_STATE)

describe('form data reducer', () => {

  describe(ON_FIELD_CHANGE, () => {
    it('updates field value', () => {
      const state = reducer(INITIAL_STATE, onFieldChange('text', 'some text'))

      expect(INITIAL_STATE.text).toBe('')
      expect(state.text).toBe('some text')
    })
  })

})

describe('form data selectors', () => {
  const data = {
    a: ['A1'],
    b: 'B2',
    text: 'some text',
    c: 'C3',
  }
  Object.freeze(data)
  const state = { form: { data } }

  describe('getFormData', () => {
    it('selects the whole form.data state space', () => {
      const fdata = getFormData(state)

      expect(fdata).toEqual(data)
    })
  })

  describe('getFieldValue', () => {
    it('passing only the state returns a function that selectes values', () => {
      const _getFieldValue = getFieldValue(state)

      expect(_getFieldValue('a')).toEqual(['A1'])
      expect(_getFieldValue('b')).toBe('B2')
      expect(_getFieldValue('text')).toBe('some text')
      expect(_getFieldValue('c')).toBe('C3')
    })

    it('selects a field value', () => {
      const text = getFieldValue(state, 'text')

      expect(text).toBe('some text')
    })
  })

})
