import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Form } from '../components/form'
import { onFieldChange, submitForm,  validateAsyncBegin } from '../actions/form'
import {
  isFormSubmitting,
  didFormSubmit,
  getSubmitionMessage,
  didSubmitionFailed,
} from '../reducers/submition'
import {
  isFinished,
  shouldDisplayStep,
  completedSteps,
  stepsCount,
} from '../reducers/steps'
import {
  isFieldPristine,
  isFieldValidating,
  fieldHasError,
  getFieldError,
  isFormValid,
} from '../reducers/validation'
import { getFieldValue } from '../reducers/data'

class FormContainer extends React.Component {

  static propTypes = {
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
    submitForm: PropTypes.func.isRequired,
  }

  handleSubmit = (e) => {
    e.preventDefault()

    if (this.props.isFormValid) {
      this.props.submitForm()
      return
    }

    this.props.validateText()
  }

  render() {

    return (
      <Form
        total={this.props.total}
        completed={this.props.completed}
        isFinished={this.props.isFinished}

        isSubmitting={this.props.isSubmitting}
        didSubmit={this.props.didSubmit}
        message={this.props.message}
        didSubmitionFailed={this.props.didSubmitionFailed}

        onFieldChange={this.props.onFieldChange}
        hasError={this.props.hasError}
        fieldError={this.props.fieldError}
        isPristine={this.props.isPristine}
        isValidating={this.props.isValidating}
        fieldValue={this.props.fieldValue}
        shouldDisplayStep={this.props.shouldDisplayStep}
        validateText={this.props.validateText}

        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const props = state => ({
  isSubmitting: isFormSubmitting(state),
  didSubmit: didFormSubmit(state),
  message: getSubmitionMessage(state),
  didSubmitionFailed: didSubmitionFailed(state),
  isFinished: isFinished(state),
  completed: completedSteps(state), total: stepsCount(state),
  isValidating: isFieldValidating(state),
  hasError: fieldHasError(state),
  fieldError: getFieldError(state),
  isPristine: isFieldPristine(state),
  fieldValue: getFieldValue(state),
  shouldDisplayStep: shouldDisplayStep(state),
  isFormValid: isFormValid(state),
})

const dispatch = {
  onFieldChange,
  validateText: validateAsyncBegin('text'),
  submitForm,
}

export default connect(props, dispatch)(FormContainer)
