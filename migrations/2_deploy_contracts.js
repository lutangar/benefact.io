var Benefactio = artifacts.require('./Benefactio.sol')

module.exports = function (deployer) {
  deployer.deploy(Benefactio)
}
