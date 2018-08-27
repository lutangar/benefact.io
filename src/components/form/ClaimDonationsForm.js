import React, { PureComponent } from 'react'
import Error from '../Error'

export default class ClaimDonationsForm extends PureComponent {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (payload) {
    return new Promise((resolve, reject) => {
      this.props.onSubmit(this.props.projectId, { form: this.props.form, resolve, reject })
    }).then(this.props.resolve)
  }

  get isButtonDisabled () {
    return !this.props.valid || this.props.submitting
  }

  render () {
    return (
      <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {this.props.error &&
        <Error>{this.props.error}</Error>
        }
        <button type='submit' disabled={this.isButtonDisabled}>Claim my donations</button>
      </form>
    )
  }
}
