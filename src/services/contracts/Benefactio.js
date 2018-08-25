import createContractFromABI from 'truffle-contract'
import BenefactioABI from '../../../build/contracts/Benefactio.json'

export default (provider) => {
  const contract = createContractFromABI(BenefactioABI);
  contract.setProvider(provider)

  return contract;
}