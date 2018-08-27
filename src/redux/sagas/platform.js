import { call, put, takeLatest } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import * as PLATFORMS from '../constants/platform'
import * as platformActions from '../actions/platform'
import { showNotificaiton } from '../actions/notification'
import { formatErrors } from '../../services/utils'
import { waitForContract } from './contracts'

function * fetchPlatformsStatusSaga () {
  try {
    const contract = yield call(waitForContract)

    const status = yield call(contract.status.call)

    yield put(platformActions.fetchPlatformStatusSuccess(status))
  } catch (e) {
    yield put(platformActions.fetchPlatformStatusFailure(e))
  }
}

function * closePlatformSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.close)

    yield put(platformActions.closePlatformSuccess())
    yield put(showNotificaiton('The platform will be closed as soon as the transaction is mined.'))
    yield call(meta.resolve)
  } catch (e) {
    yield put(platformActions.closePlatformFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

function * openPlatformSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.open)

    yield put(platformActions.openPlatformSuccess())
    yield put(showNotificaiton('The platform will be opened as soon as the transaction is mined.'))
    yield call(meta.resolve)
  } catch (e) {
    yield put(platformActions.openPlatformFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

export default function * createPlatformRootSaga () {
  yield takeLatest(PLATFORMS.FETCH_PLATFORM_STATUS_REQUEST, fetchPlatformsStatusSaga)
  yield takeLatest(PLATFORMS.CLOSE_PLATFORM_REQUEST, closePlatformSaga)
  yield takeLatest(PLATFORMS.OPEN_PLATFORM_REQUEST, openPlatformSaga)
}
