import { call, put, select, takeLatest, cancelled } from 'redux-saga/effects'
import { SubmissionError } from 'redux-form'
import * as DONATIONS from '../constants/donations'
import * as donationsActions from '../actions/donations'
import * as donationSelectors from '../selectors/donations'
import { formatErrors, formatOutputs, getDefinition } from '../../services/utils'
import { waitForContract } from './contracts'
import { getAccount } from '../selectors/accounts'
import { showNotificaiton } from '../actions/notification'

function * fetchDonationsSaga ({ payload }) {
  try {
    // const stale = yield select(donationSelectors.areDonationsStale)
    const stale = true
    if (stale) {
      const contract = yield call(waitForContract)
      const donationsCount = yield call(contract.getProjectDonationsCount.call, payload)
      const format = formatOutputs(getDefinition('getProjectDonation')(contract.abi).outputs)
      let i = 0
      while (i < donationsCount.toNumber()) {
        const donation = yield call(contract.getProjectDonation, payload, i)
        yield put(donationsActions.fetchDonationSuccess({ projectId: payload, donationId: i, ...format(donation) }))
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
    const contract = yield call(waitForContract)
    const from = yield select(getAccount)

    yield call(contract.makeDonation, payload.projectId, payload.supportMessage, { from, value: payload.value })

    yield put(donationsActions.createDonationSuccess())
    yield put(showNotificaiton('Thank you! Your donations will appeared as soon as the transaction is mined.'))
    yield call(meta.resolve)
  } catch (e) {
    console.log(e)
    yield put(donationsActions.createDonationFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

function * claimDonationSaga ({ payload, meta }) {
  try {
    const contract = yield call(waitForContract)

    yield call(contract.retrieveDonations, payload, 0x0)

    yield put(donationsActions.claimDonationsSuccess())
    yield put(showNotificaiton('Your donations have been claimed with success. You balance will be credited shortly.'))
    yield call(meta.resolve)
  } catch (e) {
    yield put(donationsActions.claimDonationsFailure(e))
    yield call(meta.reject, new SubmissionError(formatErrors(e)))
  }
}

export default function * createDonationRootSaga () {
  yield takeLatest(DONATIONS.FETCH_DONATIONS_REQUEST, fetchDonationsSaga)
  yield takeLatest(DONATIONS.CREATE_DONATION_REQUEST, makeDonationSaga)
  yield takeLatest(DONATIONS.CLAIM_DONATIONS_REQUEST, claimDonationSaga)
}
