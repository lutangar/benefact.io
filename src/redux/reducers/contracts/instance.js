import * as CONTRACTS from '../../constants/contracts'

export const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTRACTS.DEPLOY_CONTRACT_SUCCESS:
      return action.payload
    case CONTRACTS.DEPLOY_CONTRACT_FAILURE:
      return null
    default:
      return state
  }
}
