pragma solidity ^0.4.24;

import './library/SafeMath.sol';
import './basic/Owned.sol';

contract Token {
    using SafeMath for uint;

    event Transfer(address indexed _from, address indexed _to, uint _tokens);

    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) internal returns (bool success) {
        require(tokens > 0);

        msg.sender.balance.sub(tokens);
        to.balance.add(tokens);

        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Transfer `tokens` from contract to the `to` account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - Contract must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // ------------------------------------------------------------------------
    function transferDonation(address to, uint tokens) internal returns (bool success) {
        require(tokens > 0);

        address(this).balance.sub(tokens);
        to.balance.add(tokens);
        to.transfer(tokens);

        emit Transfer(this, to, tokens);
        return true;
    }
}

contract Benefactio is Token, Owned {
    uint public numProjects;
    bool public status;

    mapping (address => uint) public actorId;

    Project[] public projects;

    event ProjectAdded(uint projectId, address recipient, uint amount, string name, bool projectStatus);
    event ProjectClosed(uint projectId, address recipient, uint amount);
    event ProjectStatus(uint projectId, bool projectStatus);
    event NewDonation(uint projectId, address benefactor, uint amount, string message);
    event ActorsChanged(address actor, bool isActor);
    event PlatformStatus(bool status);

    modifier onlyActor(uint projectId) {
        require (msg.sender == projects[projectId].recipient);
        _;
    }

    struct Project {
        address recipient;
        uint amount;
        string name;
        string description;
        bytes32 projectHash;
        uint numberOfDonations;
        uint currentAmount;
        bool closed;
        bool approved;
        uint lastDonation;

        Donation[] donations;
    }

    struct Donation {
        address benefactor;
        uint amount;
        string message;
    }

    constructor() public {
        close();
    }

    function open() onlyOwner external {
        status = true;
        emit PlatformStatus(true);
    }

    function close() onlyOwner public {
        status = false;
        emit PlatformStatus(false);
    }

    function newProject(
        uint amount,
        string projectName,
        string projectDescription,
        bytes transactionBytecode
    ) external returns (uint projectId) {
        require(status = true);

        projectId = projects.length++;

        Project storage p = projects[projectId];
        p.recipient = msg.sender;
        p.amount = amount * 1 wei;
        p.name = projectName;
        p.description = projectDescription;
        p.projectHash = keccak256(abi.encodePacked(msg.sender, amount, transactionBytecode));
        p.closed = false;
        p.approved = false;

        emit ProjectAdded(projectId, p.recipient, amount, p.name, p.approved);
        numProjects = projectId + 1;

        return projectId;
    }

    function projectApprove(uint projectId) onlyOwner external {
        Project storage p = projects[projectId];

        require(p.approved == false);
        p.approved = true;

        emit ProjectStatus(projectId, status);
    }

    function checkProjectCode (
        uint projectId,
        address beneficiary,
        uint amount,
        bytes transactionBytecode
    ) constant external returns (bool code) {
        Project storage p = projects[projectId];
        return p.projectHash == keccak256(abi.encodePacked(beneficiary, amount, transactionBytecode));
    }

    function makeDonation(
        uint projectId,
        string supportMessage
    ) external payable returns (uint donationId) {
        require(status = true);
        Project storage p = projects[projectId];

        require(
            msg.sender != p.recipient &&
            p.amount >= p.currentAmount &&
            p.approved == true &&
            p.closed == false &&
            transfer(this, msg.value)
        );

        donationId = p.donations.length++;
        p.donations[donationId] = Donation({benefactor: msg.sender, amount: msg.value, message: supportMessage});
        p.numberOfDonations = donationId + 1;
        p.currentAmount += msg.value;
        p.lastDonation = block.timestamp;

        emit NewDonation(projectId, msg.sender, msg.value, supportMessage);
        return p.numberOfDonations;
    }

    function retrieveDonations(uint projectId, bytes transactionBytecode) external onlyActor(projectId) {
        require(status = true);

        Project storage p = projects[projectId];

        require(
            p.closed == false &&
            now > p.lastDonation + uint8(90) && // 6 blocks between last donation and retrieve
            p.projectHash == keccak256(abi.encodePacked(p.recipient, p.amount, transactionBytecode))
        );

        if (p.currentAmount >= p.amount) {
            require(transferDonation(msg.sender, p.amount * 1 wei));

            p.closed = true;
            emit ProjectClosed(projectId, p.recipient, p.amount);
        }
    }

    // fallback just in case
    function () public {
        revert();
    }
}
