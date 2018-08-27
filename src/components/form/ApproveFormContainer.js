import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { approveProject as onSubmit } from '../../redux/actions/projects'

import ApproveForm from './ApproveForm'

const validate = (values) => {
  const errors = {}

  return errors
}

export default compose(connect(() => ({}), { onSubmit }), reduxForm({ form: 'approve', validate }))(ApproveForm)
