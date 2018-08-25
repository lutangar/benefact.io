import * as PROVIDER from '../constants/provider'

const initialState = null

export default (state = initialState, action) => {
  if (action.type === PROVIDER.LOAD_PROVIDER_SUCCESS) {
    return action.payload
  }

  return state
}
