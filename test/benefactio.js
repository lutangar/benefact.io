const { assertRevert } = require('./helpers/assertRevert')
const expectEvent = require('./helpers/expectEvent')
let BigNumber = require('../node_modules/bignumber.js')

let Benefactio = artifacts.require('./Benefactio.sol'),
  Owned = artifacts.require('./basic/Owned.sol'),
  SafeMath = artifacts.require('./library/SafeMath.sol')

let eth = web3.eth,
  owner = eth.accounts[0],
  actor = eth.accounts[1],
  benefactor1 = eth.accounts[2],
  benefactor2 = eth.accounts[3],
  unknown = eth.accounts[4]

const timeTravel = function (time) {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_increaseTime',
      params: [time], // 86400 is num seconds in day
      id: new Date().getTime()
    }, (err, result) => {
      if (err) { return reject(err) }
      return resolve(result)
    })
  })
}

const mineBlock = function () {
  return new Promise((resolve, reject) => {
    web3.currentProvider.sendAsync({
      jsonrpc: '2.0',
      method: 'evm_mine'
    }, (err, result) => {
      if (err) { return reject(err) }
      return resolve(result)
    })
  })
}

let printBalance = async function () {
  let contract = await Benefactio.deployed()

  const contractBalance = eth.getBalance(contract.address)
  const actorBalance = eth.getBalance(actor)
  const benefactor1Balance = eth.getBalance(benefactor1)
  const benefactor2Balance = eth.getBalance(benefactor2)

  console.log('Contract Balance:', contractBalance.toString(), 'wei')
  console.log('Actor Balance:', actorBalance.toString(), 'wei')
  console.log('Benefactor1 Balance:', benefactor1Balance.toString(), 'wei')
  console.log('Benefactor2 Balance:', benefactor2Balance.toString(), 'wei')
}

contract('Benefactio', function (accounts) {
  it('Should create a disabled dApp', async () => {
    let contract = await Benefactio.deployed()
    let status = await contract.status()

    assert.equal(status, false, "The dApp shoul'nt be active")
  })

  it('Should only be activated or disabled by owner', async () => {
    let contract = await Benefactio.deployed()

    await expectEvent.inTransaction(
      contract.open({ from: owner }),
      'PlatformStatus',
      { status: true }
    )

    assert.equal(await contract.status(), true, 'The dApp should be active')
    assertRevert(contract.close({from: unknown}))
  })

  it('An ethereum address add a new project', async () => {
    let contract = await Benefactio.deployed()
    await contract.newProject(1000, 'test', 'test', 0x123, { from: actor })

    assert.equal((await contract.projects(0))[0], actor, "Address should be the actor one");
  })

  it('A project should be activated before donation', async () => {
    let contract = await Benefactio.deployed()
    let project = await contract.projects(0)

    assert.equal(project[8], false, 'The project shouldnt be approved')
    await contract.projectApprove(0, { from: owner })

    project = await contract.projects(0)
    assert.equal(project[8], true, 'The project should be approved')
  })

  it('Donations should be handled', async () => {
    let contract = await Benefactio.deployed()

    printBalance()

    await contract.makeDonation(0, "This is a support message", { from: benefactor1, value: 100 })

    let project = await contract.projects(0)
    //assert.equal(project[1], 100, "The project should contain 100 wei")
    //assert.equal(project[5], 1, "The project should have one donation")

    printBalance()

    await contract.makeDonation(0, "This is a support message", { from: benefactor2, value: 900 })
    //assert.equal(project[1], 1000, "The project should contain 100 wei")
    //assert.equal(project[5], 2, "The project should have two donation")

    printBalance()
  })

  it('Actor want to retrieve his donations', async () => {
    let contract = await Benefactio.deployed()
    timeTravel(90);

    await contract.retrieveDonations(0, 0x123, { from: actor });
    let project = await contract.projects(0)
    assert.equal(project[7], true, "The project should be closed");

    printBalance()
  })
})
