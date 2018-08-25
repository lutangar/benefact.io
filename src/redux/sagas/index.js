import { fork } from 'redux-saga/effects'
import provider from './provider'
import projects from './projects'

export default function * rootSaga () {
  yield [
    fork(provider),
    fork(projects)
  ]
}
