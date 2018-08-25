import React from 'react'
import Error from '../Error'
import Warning from '../Warning'

export default ({
  input,
  label,
  meta: { touched, error, warning }
}) => (
  <div>
    <label>{label}</label>
    <div>
      <textarea {...input} placeholder={label} />
      {touched &&
            ((error && <Error>{error}</Error>) ||
                (warning && <Warning>{warning}</Warning>))}
    </div>
  </div>
)
