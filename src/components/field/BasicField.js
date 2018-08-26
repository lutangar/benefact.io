import React from 'react'
import Error from '../Error'
import Warning from '../Warning'

export default ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    {label && <label>{label}</label>}
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched &&
            ((error && <Error>{error}</Error>) ||
                (warning && <Warning>{warning}</Warning>))}
    </div>
  </div>
)
