export const isProviderLoaded = state => !!state.provider
export const getProvider = state => state.provider
export const isContractWatching = state => state.contracts.watching;
export const isContractDeployed = state => state.contracts.deployed;
export const getContractInstance = state => state.contracts.instance;