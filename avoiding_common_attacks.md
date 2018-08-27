# Avoiding common attacks

## Transaction Ordering and Timestamp Dependence
A check has been added in `retrieveDonations` to ensure that some block confirmations occurred since the last donation,
before claiming any.

## Integer Overflow and Underflow
`uint256` integers have been used over smaller ones that could easily reach their maximum value.
Furthermore the `SafeMath` contract have been used instead of the low level arithmetic functions.
integer overflow over uint to uint256
