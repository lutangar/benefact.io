# Benefact.io

> ConsenSysAcademy: 2018DP 2018 Developer Program

Benefact.io is an online donation platform on the blockchain.

There is a list of projects proposed by some users — *actors* — and some other users — *benefactors* — can donate to these projects.

The list of projects is managed by the contract creator.

## Install
```
npm install
```

## Usage
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

## Test
1. Start a ganache blockchain:
```
npm run ganache
```
2. Run the tests
```
npm run test-contracts
```

## User stories

When the **owner** deploy the contract the platform is closed.
If the application detect the **owner**, it will show an *"Open the platform"* button in the header menu.
Once the **owner** click this button the platform will be open to the public.
The owner **owner** may close and open the platform at any time.

*Once the platform has been opened for business:*

A **user** can opens the web app and see a list of existing projects.
A user can create a new project by using the *"Submit your project"* form and see its project added to the list.
By clicking on its project in the list, the user can the page of its project.
A user **may not** contribute to its **own** project.

Before any **user** can contribute to a project the **owner** must approve the project.
When visiting a project page the **owner** may decide to click on the *"Approve the project"* button to do so.

When visiting an approved project page a **user** may donate to a project by filling the appropriate form.

Once the amount of the donations on a specific project reach the project goal, the project can't receive donations anymore.
The **project creator** may visit its project page and claim its donations by clicking on the *"Claim my donations"* button.
Once the donations have been claim by the **project creator** the project is considered **closed**.

## Testing

```
npm run test-contracts
```

## Smart contracts

### [Design Pattern Requirements](design_pattern_decisions.md)

### [Security Tools / Common Attacks](avoiding_common_attacks.md)
