import { eventChannel } from 'redux-saga'
import { call, put, select, take } from 'redux-saga/effects'
import { getProvider, isProviderLoaded } from '../selectors'
import * as PROVIDER from '../constants/provider'
import { getAccount } from '../selectors/accounts'
import createBenefactioContract from '../../services/contracts/Benefactio'
import { EVENT, formatOutputs, getDefinition } from '../../services/utils'
import { createContractEvent } from '../actions/events'
import { watchContract } from '../actions/contracts'
import * as CONTRACTS from '../constants/contracts'

const gas = 3000000
const gasPrice = 10

export function * waitForContract () {
  const providerLoaded = yield select(isProviderLoaded)
  if (!providerLoaded) {
    yield take(PROVIDER.LOAD_PROVIDER_SUCCESS)
  }

  const provider = yield select(getProvider)
  const from = yield select(getAccount)

  const Benefactio = createBenefactioContract(provider)
  Benefactio.defaults({ from, gas, gasPrice })

  const contractInstance = yield Benefactio.deployed()

  yield put(watchContract(contractInstance))

  return contractInstance
}

export function createFilterChannel (filter) {
  return eventChannel(emit => {
    filter.watch((error, result) => {
      if (!error) {
        emit(result)
      }
    })

    return () => filter.stopWatching()
  })
}

export function * watchContractEvents ({ payload: contractInstance }) {
  const eventFormatter = EVENT
  const filter = yield call(contractInstance.allEvents)
  const filterChannel = yield call(createFilterChannel, filter)

  while (true) {
    const payload = yield take(filterChannel)
    const definition = getDefinition(payload.event)(contractInstance.abi)

    yield put(
      createContractEvent(
        eventFormatter(payload.event),
        formatOutputs(definition.inputs)(payload.args),
        payload
      )
    )
  }
}

export default function * createProjectRootSaga () {
  while (true) {
    const action = yield take(CONTRACTS.WATCH_CONTRACT_REQUEST)
    yield call(watchContractEvents, action)
  }
}
