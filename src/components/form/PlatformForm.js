import React, { PureComponent } from 'react'
import Error from '../Error'
import Button from '../Button'

export default class PlatformForm extends PureComponent {
  constructor (props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit (payload) {
    if (this.props.open) {
      return new Promise((resolve, reject) => {
        this.props.closePlatform({ ...payload, projectId: this.props.projectId }, { form: this.props.form, resolve, reject })
      }).then(this.props.resolve)
    }

    return new Promise((resolve, reject) => {
      this.props.openPlatform({ ...payload, projectId: this.props.projectId }, { form: this.props.form, resolve, reject })
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
        <Button type='submit' className='pure-menu-link' disabled={this.isButtonDisabled}>{this.props.open ? 'Close the platform' : 'Open the platform'}</Button>
      </form>
    )
  }
}
