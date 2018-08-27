import { createAction } from 'redux-actions'
import * as PLATFORM from '../constants/platform'
import * as DONATIONS from '../constants/donations'

export const fetchPlatformStatus = createAction(PLATFORM.FETCH_PLATFORM_STATUS_REQUEST)
export const fetchPlatformStatusSuccess = createAction(PLATFORM.FETCH_PLATFORM_STATUS_SUCCESS)
export const fetchPlatformStatusFailure = createAction(PLATFORM.FETCH_PLATFORM_STATUS_FAILURE)

export const openPlatform = (payload, meta) => ({
  type: PLATFORM.OPEN_PLATFORM_REQUEST,
  payload,
  meta
})
export const openPlatformSuccess = createAction(PLATFORM.OPEN_PLATFORM_SUCCESS)
export const openPlatformFailure = createAction(PLATFORM.OPEN_PLATFORM_FAILURE)

export const closePlatform = (payload, meta) => ({
  type: PLATFORM.CLOSE_PLATFORM_REQUEST,
  payload,
  meta
})
export const closePlatformSuccess = createAction(PLATFORM.CLOSE_PLATFORM_SUCCESS)
export const closePlatformFailure = createAction(PLATFORM.CLOSE_PLATFORM_FAILURE)
