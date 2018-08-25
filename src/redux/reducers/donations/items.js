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

export const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case DONATIONS.FETCH_DONATIONS_SUCCESS:
      return action.payload
    case DONATIONS.FETCH_DONATIONS_FAILURE:
      return state
    default:
      return state
  }
}
