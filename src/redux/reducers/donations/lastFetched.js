import * as DONATIONS from '../../constants/donations'

export const fixtures = Date.now()

export const initialState = null

export default (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS.FETCH_DONATIONS_SUCCESS:
      return Date.now()
    case DONATIONS.FETCH_DONATIONS_FAILURE:
      return state
    default:
      return state
  }
}
