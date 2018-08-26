import * as CONTRACTS from '../../constants/contracts'

export const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTRACTS.DEPLOY_CONTRACT_SUCCESS:
      return true
    case CONTRACTS.DEPLOY_CONTRACT_FAILURE:
      return false
    default:
      return state
  }
}
