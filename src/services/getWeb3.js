import Eth from 'ethjs'
import config from '../../truffle'

let getWeb3 = new Promise(function (resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function () {
    var web3 = window.web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    // if (typeof web3 !== 'undefined') {
    if (false) {
      // Use Mist/MetaMask's provider.

      console.log('Injected web3 detected.')

      resolve(new Eth(web3.currentProvider))
    } else {
      // Fallback to localhost if no web3 injection. We've configured this to
      // use the development console's port by default.
      const { host, port } = config.networks.development

      console.log('No web3 instance injected, using Local web3.')

      resolve(new Eth(new Eth.HttpProvider(`http://${host}:${port}`)))
    }
  })
})

export default getWeb3
