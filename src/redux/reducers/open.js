import * as PLATFORM from '../constants/platform'

export const initialState = false

export default (state = initialState, action) => {
  switch (action.type) {
    case PLATFORM.FETCH_PLATFORM_STATUS_SUCCESS:
      return action.payload
    case PLATFORM.PLATFORM_STATUS_CHANGED:
      return action.payload
    default:
      return state
  }
}
