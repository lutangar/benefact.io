import { call, put, select, takeLatest, cancelled } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import * as DONATIONS from '../constants/donations'
import * as donationsActions from '../actions/donations'
import * as donationSelectors from '../selectors/donations'
import { formatErrors, formatOutputs, getDefinition } from '../../services/utils'
import { waitForContract } from './contracts'
import { getAccount } from '../selectors/accounts'

function * fetchDonationsSaga () {
  try {
    const stale = yield select(donationSelectors.areDonationsStale)
    if (stale) {
      const contract = yield call(waitForContract)
      const donationsCount = yield call(contract.numDonations.call)
      const format = formatOutputs(getDefinition('donations')(contract.abi).outputs)
      let i = 0
      while (i < donationsCount.toNumber()) {
        const donation = yield call(contract.donations.call, i)

        yield put(donationsActions.fetchDonationSuccess(format(donation)))
        i += 1
      }

      yield put(donationsActions.fetchDonationsSuccess(Date.now()))
    } else {
      const lastFetched = yield select(donationSelectors.getDonationsLastFetched)
      yield put(donationsActions.fetchDonationsSuccess(lastFetched))
    }
  } catch (e) {
    console.log(e)
    yield put(donationsActions.fetchDonationsFailure(e))
  } finally {
    if (yield cancelled()) {
      yield put(donationsActions.cancelFetchDonations())
    }
  }
}

function * makeDonationSaga ({ payload, meta }) {
  try {
    // console.log("caac");
    const contract = yield call(waitForContract)
    const from = yield select(getAccount)
    console.log(from)
    console.log(payload)
    console.log(payload.value)
    console.log(payload.projectNumber)
    console.log(payload.supportMessage)

    yield call(contract.makeDonation, payload.projectNumber, payload.supportMessage)

    yield put(donationsActions.createDonationSuccess())
  } catch (e) {
    console.log(e)
    yield put(donationsActions.createDonationFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

export default function * createDonationRootSaga () {
  yield takeLatest(DONATIONS.FETCH_DONATIONS_REQUEST, fetchDonationsSaga)
  yield takeLatest(DONATIONS.CREATE_DONATION_REQUEST, makeDonationSaga)
}
