import { createAction } from 'redux-actions'
import * as CONTRACTS from '../constants/contracts'

export const deployContract = createAction(CONTRACTS.DEPLOY_CONTRACT_REQUEST)
export const deployContractSuccess = createAction(CONTRACTS.DEPLOY_CONTRACT_SUCCESS)
export const deployContractFailure = createAction(CONTRACTS.DEPLOY_CONTRACT_FAILURE)

export const watchContract = createAction(CONTRACTS.WATCH_CONTRACT_REQUEST)
export const watchContractSuccess = createAction(CONTRACTS.WATCH_CONTRACT_SUCCESS)
export const watchContractFailure = createAction(CONTRACTS.WATCH_CONTRACT_FAILURE)

export const fetchOwner = createAction(CONTRACTS.FETCH_OWNER_REQUEST)
export const fetchOwnerSuccess = createAction(CONTRACTS.FETCH_OWNER_SUCCESS)
export const fetchOwnerFailure = createAction(CONTRACTS.FETCH_OWNER_FAILURE)