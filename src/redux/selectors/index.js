import { createSelector } from 'reselect'
import { getAccount } from './accounts'

export const isProviderLoaded = state => !!state.provider
export const getProvider = state => state.provider
export const isContractWatching = state => state.contracts.watching
export const isContractDeployed = state => state.contracts.deployed
export const getContractInstance = state => state.contracts.instance
export const getOwner = state => state.contracts.instance ? state.contracts.instance.address : null;
export const isOwner = state => createSelector(
  getOwner,
  getAccount,
  (owner, account) => account === owner
)
export const isOpen = state => state.open