import { delay } from 'redux-saga'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SHOW_NOTIFICATION } from '../constants/notification'

import { hideNotificaiton } from '../actions/notification'

export function * showNotificationSaga () {
  yield delay(7000)

  yield put(hideNotificaiton())
}

export default function * createProviderSaga () {
  yield takeLatest(SHOW_NOTIFICATION, showNotificationSaga)
}
