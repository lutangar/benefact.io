import * as DONATIONS from '../../constants/donations'

export const initialState = 0

export default (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS.FETCH_DONATIONS_REQUEST:
      return state + 1
    case DONATIONS.FETCH_DONATIONS_FAILURE:
    case DONATIONS.FETCH_DONATIONS_SUCCESS:
      return state - 1
    default:
      return state
  }
}
