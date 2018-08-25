import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import ProjectForm from './ProjectForm'
import { createProject as onSubmit } from '../../redux/actions/projects'

const validate = (values) => {
  const errors = {}

  const requiredFields = [
    'goal',
    'name',
    'description',
  ]

  requiredFields.forEach((requiredField) => {
    if (!values[requiredField]) {
      errors[requiredField] = `This field is required`
    }
  })

  return errors
}

export default compose(connect(() => ({}), { onSubmit }), reduxForm({ form: 'project', validate }))(ProjectForm)
