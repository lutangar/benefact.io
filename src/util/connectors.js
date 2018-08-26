import Eth from 'ethjs'
import { Connect } from 'uport-connect'
import config from '../../truffle'

const { host, port } = config.networks.development

export let uport = new Connect('TruffleBox')

export const web3 = new Eth(new Eth.HttpProvider(`http://${host}:${port}`))

// || new Web3(new web3.providers.HttpProvider(`http://${host}:${port}`))

//
// // Is there is an injected web3 instance?
// if (typeof web3 !== 'undefined') {
//   App.web3Provider = web3.currentProvider;
//   web3 = new Web3(web3.currentProvider);
// } else {
//   // If no injected web3 instance is detected, fallback to Ganache.
//   App.web3Provider = new web3.providers.HttpProvider(`http://${host}:${port}`);
//   web3 = new Web3(App.web3Provider);
// }
//
// console.log(uport.getWeb3());

// address
// 2ot1TeiTjep6Hs8mo54dGCxTDpnCagPFCF6
// public key
// 0x0490e9de237ac57a38c737994f2ce7325252e63bdab88936818eb99a014fd562299165c0a853618983c16374ee687cfc78d7c271e70158b85b2601a74ff5a438c6

// import { Connect, SimpleSigner } from 'uport-connect'
//
// const uport = new Connect('Lutangar Test\'s new app', {
//     clientId: '2ot1TeiTjep6Hs8mo54dGCxTDpnCagPFCF6',
//     network: 'rinkeby or ropsten or kovan',
//     signer: SimpleSigner('949b2589eae13f70ed0cc9273fa432ba7e4f883acbc6b873c68040fbc147c1c3')
// })
//
// // Request credentials to login
// uport.requestCredentials({
//     requested: ['name', 'phone', 'country'],
//     notifications: true // We want this if we want to recieve credentials
// })
//     .then((credentials) => {
//         // Do something
//     })
//
// // Attest specific credentials
// uport.attestCredentials({
//     sub: THE_RECEIVING_UPORT_ADDRESS,
//     claim: {
//         CREDENTIAL_NAME: CREDENTIAL_VALUE
//     },
//     exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
// })
//
