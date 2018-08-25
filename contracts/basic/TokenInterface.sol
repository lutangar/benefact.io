pragma solidity ^0.4.24;

contract TokenInterface {
    function transfer(address to, uint tokens) internal returns (bool success);
    function transferFrom(address from, address to, uint tokens) internal returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
}
