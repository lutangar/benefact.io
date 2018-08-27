import { EVENT } from '../../services/utils'

export const CREATE_DONATION_REQUEST = 'CREATE_DONATION_REQUEST'
export const CREATE_DONATION_SUCCESS = 'CREATE_DONATION_SUCCESS'
export const CREATE_DONATION_FAILURE = 'CREATE_DONATION_FAILURE'

export const FETCH_DONATION_REQUEST = 'FETCH_DONATION_REQUEST'
export const FETCH_DONATION_SUCCESS = 'FETCH_DONATION_SUCCESS'
export const FETCH_DONATION_FAILURE = 'FETCH_DONATION_FAILURE'

export const FETCH_DONATIONS_REQUEST = 'FETCH_DONATIONS_REQUEST'
export const FETCH_DONATIONS_SUCCESS = 'FETCH_DONATIONS_SUCCESS'
export const FETCH_DONATIONS_FAILURE = 'FETCH_DONATIONS_FAILURE'
export const FETCH_DONATIONS_CANCEL = 'FETCH_DONATIONS_CANCEL'

export const DONATION_CREATED = EVENT('NewDonation')
