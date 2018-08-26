const { assertRevert } = require('./helpers/assertRevert')
const expectEvent = require('./helpers/expectEvent')

let Benefactio = artifacts.require('./Benefactio.sol'),
  Owned = artifacts.require('./basic/Owned.sol'),
  SafeMath = artifacts.require('./library/SafeMath.sol')

let eth = web3.eth,
  owner = eth.accounts[0],
  benefactor = eth.accounts[1],
  actor1 = eth.accounts[2],
  actor2 = eth.accounts[3],
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
  const ownerBalance = eth.getBalance(owner)
  const benefactorBalance = eth.getBalance(benefactor)
  const actor1Balance = eth.getBalance(actor1)
  const actor2Balance = eth.getBalance(actor2)

  let contract = await Benefactio.deployed()
  let balance = await contract.balanceOf.call(owner)
  console.log('Contract Balance: ', web3.fromWei(ownerBalance, 'ether').toString(), ' ETHER')
}

contract('Benefactio', function (accounts) {
  it('Should create the dApp with empty projects and owner as only benefactor', async () => {
    let contract = await Benefactio.deployed()
    let status = await contract.status()
    let benefactor = await contract.benefactors(1)

    assert.equal(status, false, "The dApp shoul'nt be active")
    assert.equal(benefactor[1], 'founder', 'The default benefactor should be founder')
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

  it('Should add an external benefactor', async () => {
    let contract = await Benefactio.deployed()

    await expectEvent.inTransaction(
      contract.addBenefactor(benefactor, 'test', { from: owner }),
      'BenefactorsChanged',
      { benefactor: benefactor, isBenefactor: true }
    )

    let bene = await contract.benefactorId(benefactor)
    assert.equal(bene.toNumber(), 2, 'The first external benefactor should be 2')
  })

  it('Should remove owner benefactor', async () => {
    let contract = await Benefactio.deployed()

    await expectEvent.inTransaction(
      contract.removeBenefactor(owner, { from: owner }),
      'BenefactorsChanged',
      { benefactor: owner, isBenefactor: false }
    )

    let bene = await contract.benefactors(1)
    assert.equal(bene[0], benefactor, 'The first external benefactor should be 1')
  })

  it('A benefactor should add a new project', async () => {
    let contract = await Benefactio.deployed()
    await contract.newProject(1000, 'test', 'test', 0x123, { from: benefactor })

    assertRevert(contract.newProject(1000, 'test', 'test', 0x123, { from: unknown }))
  })

  it('A project should be activated before donation', async () => {
    let contract = await Benefactio.deployed()
    let project = await contract.projects(0)

    assert.equal(project[8], false, 'The project shouldnt be approved')
    await contract.projectApprove(0, { from: owner })

    project = await contract.projects(0)
    assert.equal(project[8], true, 'The project should be approved')
  })

  it('A donation should be handled', async () => {

  })
})
