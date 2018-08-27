import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { claimDonations as onSubmit } from '../../redux/actions/donations'

import ClaimDonationsForm from './ClaimDonationsForm'

export default compose(connect(() => ({}), { onSubmit }), reduxForm({ form: 'claim' }))(ClaimDonationsForm)
