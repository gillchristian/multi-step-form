import { Observable } from 'rxjs'

import { onFieldChange } from '../actions/form'
import {
  nextStepEpic,
} from './form'

const state = {
  form: {
    steps: {
      current: 'a',
    },
  },
}

describe('form epic tests', () => {

  describe('nextStepEpic', () => {
    it('emits MOVE_TO_NEXT_STEP actions when field changes', (done) => {
      const action$ = Observable.of(
        onFieldChange('text', 'some text'), // is filtered on the first step
        onFieldChange('a', ['A1']), // passes through
        onFieldChange('b', 'B1'), // is filtered because is not the current
      )
      const getState = jest.fn(() => state)

      const nextSteps$= nextStepEpic(action$, { getState })

      const results = []
      nextSteps$.subscribe({
        next: action => {
          results.push(action)
        },
        complete: () => {
          expect(getState).toHaveBeenCalledTimes(2)
          expect(results.length).toBe(1)
          done()
        },
      })
    })
  })

})
