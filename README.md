# Benefact.io
<!-- What does your project do? -->
Benefact.io is an online donation platform on the blockchain.

There are a list of projects and their features, proposed by some users — *actors* — and some other users — *benefactors* — can choose to donate to these projects.

The list of projects is managed by the contract creator and all the *benefactors* at equal rights weight.

## Install
<!--
- How to set it up
- Run a local development server
"Run app on a dev server locally for testing/grading
(connecting to Rinkeby if required)"
App runs without tweaking

"Should be able to visit a URL and interact with the app
(can be localhost)"
-->
```
npm install
```

## Usage
<!--
"It works as expected. I can visit the application in the browser and interact with it via metamask"
"The applications should have the following features:
- App recognizes current account and display it
- Sign transactions using MetaMask / uPort
- Contract state is updated
- Update reflected in UI
-->

1. Run a blockchain with ganache:
```
npm run ganache
```

2. Compile and migrate the contracts:
```
npm run compile
npm run migrate
```

2. Run the app:
```
npm start
```

3. Visit http://localhost:3000

## User stories

A user can opens the web app and see list of existing projects.

A user can create a new project and see its project added to the list.

<!-- @todo
An administrator opens the web app. The web app reads the address and identifies that the user is an admin,
showing them admin only functions, such as managing store owners. An admin adds an address to the list
of approved store owners, so if the owner of that address logs into the app, they have access to the
store owner functions.

An approved store owner logs into the app. The web app recognizes their address and identifies them as a store owner.
They are shown the store owner functions. They can create a new storefront that will be displayed on the marketplace.
They can also see the storefronts that they have already created. They can click on a storefront to manage it.
They can add/remove products to the storefront or change any of the products’ prices.
They can also withdraw any funds that the store has collected from sales.

A shopper logs into the app. The web app does not recognize their address so they are shown the generic
 shopper application. From the main page they can browse all of the storefronts that have been created
 in the marketplace. Clicking on a storefront will take them to a product page.
They can see a list of products offered by the store, including their price and quantity.
Shoppers can purchase a product, which will debit their account and send it to the store.
The quantity of the item in the store’s inventory will be reduced by the appropriate amount.
-->

## Testing

```
truffle test
```

## Smart contracts
<!--
Library / EthPM
"At least one of the project contracts includes an
import from a library/contract or an ethPM package.

If none of the project contracts do, then there is a
demonstration contract that does."
"The student does import a library or
ethpm package."

Additional Requirements
"Smart Contract code should be commented
according to the specs in the documentation

"5 tests (Javascript or Solidity or both)
with explanations for each smart contract written
(where appropriate)"
"There are at least 5 tests written
for each contract, and they clearly explain why they were implemented."
○  	Explain why you wrote those tests
○  	Tests run with truffle test

"Tests are properly structured
(ie sets up context, executes a call on
the function to be tested, and verifies
the result is correct)"
-->

### [Design Pattern Requirements](design_pattern_decisions.md)

### [Security Tools / Common Attacks](avoiding_common_attacks.md)

### Testnet deployment
See contracts addresses on the **rinkeby** testnet, provided in:
[deployed_addresses.txt](deployed_addresses.txt)

## Stretch Goals
- [ ] IPFS
- [ ] uPort
- [ ] Ethereum Name Service
- [ ] Oracle
- [ ] Upgradable Pattern Registry or Delegation
- [ ] One smart contracts implemented in LLL / Vyper
- [ ] Application deployed on the Rinkeby test network
