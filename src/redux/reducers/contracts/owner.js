import * as CONTRACTS from '../../constants/contracts'

export const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case CONTRACTS.FETCH_OWNER_SUCCESS:
      return action.payload
    default:
      return state
  }
}
