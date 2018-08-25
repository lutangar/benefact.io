import { call, put, select, take, takeLatest, cancelled } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import * as PROJECTS from '../constants/projects'
import * as PROVIDER from '../constants/provider'
import * as projectsActions from '../actions/projects'
import * as projectSelectors from '../selectors/projects'
import { formatErrors, formatOutputs, getDefinition } from '../../services/utils'
import createBenefactioContract from '../../services/contracts/Benefactio'
import { getProvider, isProviderLoaded } from '../selectors'
import { getAccount } from '../selectors/accounts'

const gas = 3000000;

function* fetchProjectsSaga () {
  try {
    const stale = yield select(projectSelectors.areProjectsStale);
    if (stale) {
      const contract = yield call(waitForContract)
      const projectsCount = yield call(contract.numProjects.call)
      const format = formatOutputs(getDefinition('projects')(contract.abi).outputs);
      let i = 0
      while (i < projectsCount.toNumber()) {
        const project = yield call(contract.projects.call, i)

        yield put(projectsActions.fetchProjectSuccess(format(project)));
        i += 1
      }

      yield put(projectsActions.fetchProjectsSuccess(Date.now()));
    } else {
      const lastFetched = yield select(projectSelectors.getProjectsLastFetched);
      yield put(projectsActions.fetchProjectsSuccess(lastFetched))
    }
  } catch (e) {
    console.log(e);
    yield put(projectsActions.fetchProjectsFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(projectsActions.cancelFetchProjects())
    }
  }
}

function * waitForContract () {
  const providerLoaded = yield select(isProviderLoaded);
  if (!providerLoaded) {
    yield take(PROVIDER.LOAD_PROVIDER_SUCCESS)
  }

  const provider = yield select(getProvider)
  const from = yield select(getAccount)

  const Benefactio = createBenefactioContract(provider);
  Benefactio.defaults({ from, gas })

  return yield Benefactio.deployed()
}

function * createProjectSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.newProject, payload.goal, payload.description, 0x0)

    yield put(projectsActions.createProjectSuccess())
  } catch (e) {
    yield put(projectsActions.createProjectFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

export default function * createProjectRootSaga () {
  yield takeLatest(PROJECTS.FETCH_PROJECTS_REQUEST, fetchProjectsSaga)
  yield takeLatest(PROJECTS.CREATE_PROJECT_REQUEST, createProjectSaga)
}
