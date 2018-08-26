import { reduxForm } from 'redux-form'
import ProjectForm from './ProjectForm'

const validate = (values) => {
  const errors = {}

  const requiredFields = [
    'goal',
    'name',
    'description'
  ]

  requiredFields.forEach((requiredField) => {
    if (!values[requiredField]) {
      errors[requiredField] = `This field is required`
    }
  })

  return errors
}

export default reduxForm({ form: 'project', validate })(ProjectForm)
