import * as ACCOUNTS from '../constants/accounts'

const initialState = []

export default (state = initialState, action) => {
  if (action.type === ACCOUNTS.FETCH_ACCOUNTS_SUCCESS) {
    return action.payload
  }

  return state
}
