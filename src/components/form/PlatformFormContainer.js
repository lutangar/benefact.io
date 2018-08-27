import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { openPlatform, closePlatform } from '../../redux/actions/platform'

import PlatformForm from './PlatformForm'
import { isOpen } from '../../redux/selectors'

const validate = (values) => {
  const errors = {}

  return errors
}

export default compose(connect((state) => ({ open: isOpen(state)}), { openPlatform, closePlatform }), reduxForm({ form: 'platform', validate }))(PlatformForm)
