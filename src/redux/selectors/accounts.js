import { getChecksumAddress } from 'ethjs-account'

export const getAccount = state => state.accounts[0] ? getChecksumAddress(state.accounts[0]) : null
