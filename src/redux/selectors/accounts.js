import { getChecksumAddress } from 'ethjs-account'

export const getAccount = state => state.accounts[1] ? getChecksumAddress(state.accounts[1]) : null;
