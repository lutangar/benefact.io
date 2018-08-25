import React, { PureComponent } from 'react'
import { Field } from 'redux-form'
import BasicField from '../field/BasicField'
import Error from '../Error'

export default class DonationForm extends PureComponent {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (payload) {
    return new Promise((resolve, reject) => {
      this.props.onSubmit(payload, { form: this.props.form, resolve, reject })
    }).then(this.props.resolve)
  }

  get isButtonDisabled () {
    return !this.props.valid || this.props.pristine || this.props.submitting
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.props.error &&
        <Error>{this.props.error}</Error>
        }
        <Field
          name='amount'
          type='number'
          component={BasicField}
          label='Amount'
        />
        <button type='submit' disabled={this.isButtonDisabled}>Submit</button>
      </form>
    )
  }
}
