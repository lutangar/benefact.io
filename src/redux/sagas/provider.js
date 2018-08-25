import { call, put, takeLatest } from 'redux-saga/effects'
import * as PROVIDER from '../constants/provider'
import * as providerActions from '../actions/provider'
import * as accountsActions from '../actions/accounts'
import getWeb3 from '../../services/getWeb3'

export function * loadProviderSaga () {
  try {
    const web3 = yield getWeb3
    const accounts = yield call(web3.accounts);
    yield put(accountsActions.fetchAccountsSuccess(accounts))

    yield put(providerActions.loadProviderSuccess(web3.currentProvider))
  } catch (e) {
    yield put(providerActions.loadProviderFailure(e))
  }
}

export default function * createProviderSaga () {
  yield takeLatest(PROVIDER.LOAD_PROVIDER_REQUEST, loadProviderSaga)
}
