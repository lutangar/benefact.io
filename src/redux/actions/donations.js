import { createAction } from 'redux-actions'
import * as DONATIONS from '../constants/donations'

export const createDonation = (payload, meta) => ({
  type: DONATIONS.CREATE_DONATION_REQUEST,
  payload,
  meta
})
export const createDonationSuccess = createAction(DONATIONS.CREATE_DONATION_SUCCESS)
export const createDonationFailure = createAction(DONATIONS.CREATE_DONATION_FAILURE)

export const fetchDonation = createAction(DONATIONS.FETCH_DONATION_REQUEST)
export const fetchDonationSuccess = createAction(DONATIONS.FETCH_DONATION_SUCCESS)
export const fetchDonationFailure = createAction(DONATIONS.FETCH_DONATION_FAILURE)

export const fetchDonations = createAction(DONATIONS.FETCH_DONATIONS_REQUEST)
export const fetchDonationsSuccess = createAction(DONATIONS.FETCH_DONATIONS_SUCCESS)
export const fetchDonationsFailure = createAction(DONATIONS.FETCH_DONATIONS_FAILURE)
export const cancelFetchDonations = createAction(DONATIONS.FETCH_DONATIONS_CANCEL)

export const claimDonations = (payload, meta) => ({
  type: DONATIONS.CLAIM_DONATIONS_REQUEST,
  payload,
  meta
})
export const claimDonationsSuccess = createAction(DONATIONS.CLAIM_DONATIONS_SUCCESS)
export const claimDonationsFailure = createAction(DONATIONS.CLAIM_DONATIONS_FAILURE)