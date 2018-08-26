import React from 'react'

const LoginButton = ({ account }) => {
  return (
    <li className='pure-menu-item'>
      <a href='#' className='pure-menu-link'>
        <img
          className='uport-logo'
          src={`https://eth.vanity.show/${account}`}
          alt={`Identicon of ether address ${account}`}
        />
        {account}
      </a>
    </li>
  )
}

export default LoginButton
