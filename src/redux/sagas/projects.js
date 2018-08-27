import { call, put, select, takeLatest, cancelled } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import * as PROJECTS from '../constants/projects'
import * as projectsActions from '../actions/projects'
import { showNotificaiton } from '../actions/notification'
import * as projectSelectors from '../selectors/projects'
import { formatErrors, formatOutputs, getDefinition } from '../../services/utils'
import { waitForContract } from './contracts'

function * fetchProjectsSaga () {
  try {
    const stale = yield select(projectSelectors.areProjectsStale)
    if (stale) {
      const contract = yield call(waitForContract)
      console.log(contract)
      const projectsCount = yield call(contract.numProjects.call)
      const format = formatOutputs(getDefinition('projects')(contract.abi).outputs)
      let i = 0
      while (i < projectsCount.toNumber()) {
        const project = yield call(contract.projects.call, i)

        yield put(projectsActions.fetchProjectSuccess({ projectId: i, ...format(project) }))
        i += 1
      }

      yield put(projectsActions.fetchProjectsSuccess(Date.now()))
    } else {
      const lastFetched = yield select(projectSelectors.getProjectsLastFetched)
      yield put(projectsActions.fetchProjectsSuccess(lastFetched))
    }
  } catch (e) {
    console.log(e)
    yield put(projectsActions.fetchProjectsFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(projectsActions.cancelFetchProjects())
    }
  }
}

function * createProjectSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.newProject, payload.goal, payload.name, payload.description)

    yield put(projectsActions.createProjectSuccess())
    yield put(showNotificaiton('Your project has been submitted with success, it will appears in the list as soon as your transaction is mined.'))
    yield call(meta.resolve)
  } catch (e) {
    yield put(projectsActions.createProjectFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

function * approveProjectSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.projectApprove, payload.projectId)

    yield put(projectsActions.approveProjectSuccess(payload.projectId))
    yield put(showNotificaiton('The project will be approved as soon as the transaction is mined.'))
  } catch (e) {
    yield put(projectsActions.createProjectFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

export default function * createProjectRootSaga () {
  yield takeLatest(PROJECTS.FETCH_PROJECTS_REQUEST, fetchProjectsSaga)
  yield takeLatest(PROJECTS.CREATE_PROJECT_REQUEST, createProjectSaga)
  yield takeLatest(PROJECTS.APPROVE_PROJECT_REQUEST, approveProjectSaga)
}
