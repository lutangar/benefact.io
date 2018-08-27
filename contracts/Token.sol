pragma solidity ^0.4.24;

import './library/SafeMath.sol';

contract Token {
    using SafeMath for uint;

    event Transfer(address indexed _from, address indexed _to, uint _tokens);

    /// @notice Transfer `tokens` from the sender `to` the specified account
    /// @param to The recipient address
    /// @param tokens The number of tokens
    function transfer(address to, uint tokens) internal returns (bool success) {
        require(tokens > 0);

        msg.sender.balance.sub(tokens);
        to.balance.add(tokens);

        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    /// @notice Transfer `tokens` from the contract `to` the specified account
    /// @param to The recipient address
    /// @param tokens The number of tokens
    function transferDonation(address to, uint tokens) internal returns (bool success) {
        require(tokens > 0);

        address(this).balance.sub(tokens);
        to.balance.add(tokens);
        to.transfer(tokens);

        emit Transfer(this, to, tokens);
        return true;
    }
}