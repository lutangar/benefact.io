# Design pattern decisions

## Fail early and fail loud
In most of the contracts functions `require` have been used at the top the body function to fail as earliest as possible.

## Restricting Access
Some functions are restricted to different kind of users:
- The control of the "Circuit Breaker" is only accessible by the owner via the `open` and `close` functions
- A project can only be approved by the owner see `projectApprove`
- The donations can only be claimed by the project creator via the `onlyActor` modifier used in `retrieveDonations`

## Circuit Breaker status
The circuit breaker has been implemented via the `open` and `close` functions and is only accessible by the owner.
Furthermore many `require` ensure that sensitive functions can't be called when the contract is *"closed"*.
