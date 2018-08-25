import { createAction } from 'redux-actions'
import * as ACCOUNTS from '../constants/accounts'

export const fetchAccounts = createAction(ACCOUNTS.FETCH_ACCOUNTS_REQUEST)
export const fetchAccountsSuccess = createAction(ACCOUNTS.FETCH_ACCOUNTS_SUCCESS)
export const fetchAccountsFailure = createAction(ACCOUNTS.FETCH_ACCOUNTS_FAILURE)
export const cancelFetchAccounts = createAction(ACCOUNTS.FETCH_ACCOUNTS_CANCEL)
