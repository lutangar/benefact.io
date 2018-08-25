import { createAction } from 'redux-actions'
import * as PROVIDER from '../constants/provider'

export const loadProvider = createAction(PROVIDER.LOAD_PROVIDER_REQUEST)
export const loadProviderSuccess = createAction(PROVIDER.LOAD_PROVIDER_SUCCESS)
export const loadProviderFailure = createAction(PROVIDER.LOAD_PROVIDER_FAILURE)
