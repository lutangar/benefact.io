import * as DONATIONS from '../../constants/donations'

export const fixtures = [
  {
    address: '0x0000000000000000000000000000000000000000',
    project: 1,
    amount: 30
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    project: 1,
    amount: 30
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    project: 2,
    amount: 30
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    project: 1,
    amount: 30
  },
  {
    address: '0x0000000000000000000000000000000000000000',
    project: 3,
    amount: 30
  }
]

export const donationInitialState = {}
export const initialState = {}

export default (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS.FETCH_DONATION_SUCCESS:
    case DONATIONS.DONATION_CREATED:
      return {
        ...state,
        [action.payload.donationId]: {
          ...donationInitialState,
          ...state[action.payload.donationId],
          ...action.payload
        }
      }
    default:
      return state
  }
}
