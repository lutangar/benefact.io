import { connect } from 'react-redux'
import LoginButton from './LoginButton'
import { getAccount } from '../../redux/selectors/accounts'


const LoginButtonContainer = connect(
  (state) => ({
    account: getAccount(state)
  })
)(LoginButton)

export default LoginButtonContainer
