import React from 'react'
import PropTypes from 'prop-types'

import { Input, Button, Spinner, Help, Progress } from '../styled'
import CheckboxGroup from './CheckboxGroup'
import ToggleGroup from './ToggleGroup'
import Section from '../Section'

function Form({
  isSubmitting,
  didSubmit,
  message,
  didSubmitionFailed,
  total,
  completed,
  isFinished,
  isPristine,
  isValidating,
  fieldValue,
  hasError,
  fieldError,
  shouldDisplayStep,
  onFieldChange,
  validateText,
  handleSubmit,
}) {

  const aItems = [
    { value: 'a1', label: 'Cheese' },
    { value: 'a2', label: 'BBQ' },
  ]

  const bItems = [
    { value: 'b1', label: 'Dog' },
    { value: 'b2', label: 'Cat' },
  ]

  const cItems = [
    { value: 'c1', label: 'Backend' },
    { value: 'c2', label: 'Frontend' },
    { value: 'c3', label: 'Fullstack' },
  ]

  return (
    <form onSubmit={handleSubmit}>

      <Progress
        total={total}
        count={completed}
        success={didSubmit && !didSubmitionFailed}
        error={didSubmit && didSubmitionFailed}
      />

      {
        shouldDisplayStep('a') &&
        <Section title="Burgers with?" bg="darkseagreen">
          <CheckboxGroup
            items={aItems}
            value={fieldValue('a')}
            onChange={v => onFieldChange('a', v)}
            multiple
          />
          {
            hasError('a') && !isPristine('a') &&
            <Help type="danger">{fieldError('a')}</Help>
          }
        </Section>
      }

      {
        shouldDisplayStep('b') &&
        <Section title="Best buddy" bg="lightsteelblue">
          <ToggleGroup
            items={bItems}
            value={fieldValue('b')}
            onChange={v => onFieldChange('b', v)}
          />
          {
            hasError('b') && !isPristine('b') &&
            <Help type="danger">{fieldError('b')}</Help>
          }
        </Section>
      }

      {
        shouldDisplayStep('text') &&
        <Section title="Your at handle" bg="papayawhip">
          <Input
            placeholder="@asdf"
            value={fieldValue('text')}
            onChange={e => onFieldChange('text', e.target.value)}
            error={hasError('text') && !isPristine('text')}
          />
          {
            !isPristine('text') &&
            <Help type={hasError('text') ? 'danger' : 'success'}>
              {
                hasError('text')
                  ? fieldError('text')
                  : 'Yay!!!'
              }
            </Help>
          }
          {
            isValidating('text')
              ? <Button loading><Spinner /></Button>
              : <Button
                  error={hasError('text') && !isPristine('text')}
                  onClick={validateText}
                >
                  Check
                </Button>
          }
        </Section>
      }

      {
        shouldDisplayStep('c') &&
        <Section title="Role" bg="palevioletred">
          <CheckboxGroup
            items={cItems}
            value={fieldValue('c')}
            onChange={v => onFieldChange('c', v)}
          />
          {
            hasError('c') && !isPristine('c') &&
            <Help type="danger">{fieldError('c')}</Help>
          }
        </Section>
      }

      {
        isFinished &&
        <Section bg="rosybrown">
          {
            isSubmitting
              ? <Button loading><Spinner /></Button>
              : <Button type="submit" onClick={handleSubmit}>Submit</Button>
          }
          {
            didSubmit && !isSubmitting &&
            <Help type={didSubmitionFailed ? 'danger' : 'success'}>
              {message}
            </Help>
          }
        </Section>
      }

    </form>
  )
}

Form.propTypes = {
  isSubmitting: PropTypes.bool,
  didSubmit: PropTypes.bool,
  message: PropTypes.string,
  didSubmitionFailed: PropTypes.bool,
  total: PropTypes.number,
  completed: PropTypes.number,
  isFinished: PropTypes.bool,
  isPristine: PropTypes.func.isRequired,
  isValidating: PropTypes.func.isRequired,
  fieldValue: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  fieldError: PropTypes.func.isRequired,
  shouldDisplayStep: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
  validateText: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default Form
