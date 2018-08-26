import * as CONTRACTS from '../../constants/contracts'

export const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTRACTS.WATCH_CONTRACT_SUCCESS:
      return true
    case CONTRACTS.WATCH_CONTRACT_FAILURE:
      return false
    default:
      return state
  }
}
