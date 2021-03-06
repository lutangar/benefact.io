import { fork } from 'redux-saga/effects'
import provider from './provider'
import projects from './projects'
import donations from './donations'
import contracts, { watchFetchOwnerSaga } from './contracts'
import notification from './notification'
import platform from './platform'

export default function * rootSaga () {
  yield [
    fork(provider),
    fork(projects),
    fork(donations),
    fork(contracts),
    fork(watchFetchOwnerSaga),
    fork(notification),
    fork(platform),
  ]
}
