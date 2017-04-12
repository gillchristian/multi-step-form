import {
  submitForm,
  submitFormEnd,
  validateAsyncBegin,
  validateAsyncEnd,
  moveToNextStep,
  onFieldChange,
} from './form'

describe('action creators', () => {

  describe('submitForm', () => {
    it('creates a SUBMIT_FORM_BEGIN action', () => {
      const action = submitForm()

      expect(action).toMatchSnapshot()
    })
  })

  describe('submitFormEnd', () => {
    it('creates a SUBMIT_FORM_END action with error', () => {
      const action = submitFormEnd(new Error('some error'))

      expect(action).toMatchSnapshot()
    })

    it('creates a SUBMIT_FORM_END action with no error', () => {
      const action = submitFormEnd()

      expect(action).toMatchSnapshot()
    })
  })

  describe('validateAsyncBegin', () => {
    it('creates an action with the provided field as meta', () => {
      const action = validateAsyncBegin('field-name')()

      expect(action).toMatchSnapshot()
    })
  })

  describe('validateAsyncEnd', () => {
    it('creates an action with the provided field as meta and payload', () => {
      const action = validateAsyncEnd('field-name')({foo: 'bar'})

      expect(action).toMatchSnapshot()
    })

    it('creates an action with the provided field as meta and error', () => {
      const action = validateAsyncEnd('field-name')(new Error('some error'))

      expect(action).toMatchSnapshot()
    })
  })

  describe('moveToNextStep', () => {
    it('creates a MOVE_TO_NEXT_STEP action', () => {
      const action = moveToNextStep()

      expect(action).toMatchSnapshot()
    })
  })

  describe('onFieldChange', () => {
    it('creates an ON_FIELD_CHANGE action with meta and payload', () => {
      const action = onFieldChange('field-name', 'some value')

      expect(action).toMatchSnapshot()
    })
  })
})

