import { getChecksumAddress } from 'ethjs-account'
import { getAccount } from './accounts'

export const isProviderLoaded = state => !!state.provider
export const getProvider = state => state.provider
export const isContractWatching = state => state.contracts.watching
export const isContractDeployed = state => state.contracts.deployed
export const getContractInstance = state => state.contracts.instance
export const getOwner = state => state.contracts.owner ? getChecksumAddress(state.contracts.owner) : null
export const isOwner = state => getOwner(state) === getAccount(state)
export const isOpen = state => state.open
