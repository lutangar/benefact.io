import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { createDonation as onSubmit } from '../../redux/actions/donations'

import DonationForm from './DonationForm'

const validate = (values) => {
  const errors = {}

  if (!values.amount) {
    errors.amount = `First name is required`
  }

  return errors
}

export default compose(connect(() => ({}), { onSubmit }), reduxForm({ form: 'donation', validate }))(DonationForm)
