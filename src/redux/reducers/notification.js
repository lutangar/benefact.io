import * as NOTIFICATIONS from '../constants/notification'

const initialState = ''

export default (state = initialState, action) => {
  if (action.type === NOTIFICATIONS.SHOW_NOTIFICATION) {
    return action.payload
  }

  if (action.type === NOTIFICATIONS.HIDE_NOTIFICATION) {
    return ''
  }

  return state
}
