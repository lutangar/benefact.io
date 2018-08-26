import { createAction } from 'redux-actions'
import * as NOTIFICATIONS from '../constants/notification'

export const showNotificaiton = createAction(NOTIFICATIONS.SHOW_NOTIFICATION)
export const hideNotificaiton = createAction(NOTIFICATIONS.HIDE_NOTIFICATION)
