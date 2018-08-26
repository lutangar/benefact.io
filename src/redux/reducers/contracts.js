import * as CONTRACTS from '../constants/contracts'

const initialState = false

export default (state = initialState, action) => {
  if (action.type === CONTRACTS.WATCH_CONTRACT_SUCCESS) {
    return true
  }

  return state
}
