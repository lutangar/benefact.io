import { getChecksumAddress } from 'ethjs-account'

export const createContractEvent = (
  eventName,
  payload,
  { blockHash, blockNumber, logIndex, removed, transactionHash, transactionIndex, address }
) => ({
  type: eventName,
  payload,
  meta: {
    blockHash,
    blockNumber,
    logIndex,
    removed,
    transactionHash,
    transactionIndex,
    contract: getChecksumAddress(address)
  }
})
