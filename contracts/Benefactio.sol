pragma solidity ^0.4.24;

import './library/SafeMath.sol';
import './basic/Owned.sol';
import './basic/TokenInterface.sol';

contract Token is TokenInterface {
    using SafeMath for uint;

    mapping(address => uint) balances;
    mapping(address => mapping(address => uint)) allowed;

    // ------------------------------------------------------------------------
    // Transfer the balance from token owner's account to `to` account
    // - Owner's account must have sufficient balance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transfer(address to, uint tokens) internal returns (bool success) {
        balances[msg.sender] = balances[msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);

        emit Transfer(msg.sender, to, tokens);
        return true;
    }

    // ------------------------------------------------------------------------
    // Transfer `tokens` from the `from` account to the `to` account
    //
    // The calling account must already have sufficient tokens approve(...)-d
    // for spending from the `from` account and
    // - From account must have sufficient balance to transfer
    // - Spender must have sufficient allowance to transfer
    // - 0 value transfers are allowed
    // ------------------------------------------------------------------------
    function transferFrom(address from, address to, uint tokens) internal returns (bool success) {
        balances[from] = balances[from].sub(tokens);
        allowed[from][msg.sender] = allowed[from][msg.sender].sub(tokens);
        balances[to] = balances[to].add(tokens);

        emit Transfer(from, to, tokens);
        return true;
    }
}

contract Benefactio is Token, Owned {
    uint public numProjects;
    bool public status;

    mapping (address => uint) public benefactorId;

    Project[] public projects;
    Benefactor[] public benefactors;

    event ProjectAdded(uint projectId, address recipient, uint amount, string name, bool projectStatus);
    event ProjectClosed(uint projectId, address recipient, uint amount);
    event ProjectStatus(uint projectId, bool projectStatus);
    event NewDonation(uint projectId, address actor, uint amount, string message);
    event BenefactorsChanged(address benefactor, bool isBenefactor);

    event PlatformStatus(bool status);

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
        uint256 lastDonation;

        Donation[] donations;
    }

    struct Benefactor {
        address benefactor;
        string name;
    }

    struct Donation {
        address actor;
        uint amount;
        string message;
    }

    modifier onlyBenefactors {
        require(benefactorId[msg.sender] != 0);
        _;
    }

    constructor() public {
        close();

        addBenefactor(0, '');
        addBenefactor(owner, 'founder');
    }

    function open() onlyOwner external {
        status = true;
        emit PlatformStatus(true);
    }

    function close() onlyOwner public {
        status = false;
        emit PlatformStatus(false);
    }

    function addBenefactor(address targetBenefactor, string benefactorName) onlyOwner public {
        uint id = benefactorId[targetBenefactor];
        if (0 == id) {
            benefactorId[targetBenefactor] = benefactors.length;
            id =  benefactors.length++;
        }

        benefactors[id] = Benefactor({benefactor: targetBenefactor, name: benefactorName});
        emit BenefactorsChanged(targetBenefactor, true);
    }

    function removeBenefactor(address targetBenefactor) onlyOwner public {
        require(benefactorId[targetBenefactor] != 0);

        for (uint i = benefactorId[targetBenefactor]; i < benefactors.length - 1; i++) {
            benefactors[i] = benefactors[i + 1];
        }

        delete benefactors[benefactors.length - 1];
        benefactors.length--;

        emit BenefactorsChanged(targetBenefactor, false);
    }

    function newProject(
        uint amount,
        string projectName,
        string projectDescription,
        bytes transactionBytecode
    ) onlyBenefactors external returns (uint projectId) {
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

        require(transfer(this, msg.value));

        donationId = p.donations.length++;
        p.donations[donationId] = Donation({actor: msg.sender, amount: msg.value, message: supportMessage});
        p.numberOfDonations = donationId + 1;
        p.currentAmount += msg.value;
        p.lastDonation = block.timestamp;

        emit NewDonation(projectId, msg.sender, msg.value, supportMessage);
        return p.numberOfDonations;
    }

    function retrieveDonations(uint projectId, bytes transactionBytecode) onlyBenefactors external payable {
        require(status = true);

        Project storage p = projects[projectId];

        require(
            p.closed == false &&
            now > p.lastDonation + uint8(90) && // 6 blocks between last donation and retrieve
            p.recipient == msg.sender &&
            p.projectHash == keccak256(abi.encodePacked(p.recipient, p.amount, transactionBytecode))
        );

        if (p.currentAmount >= p.amount) {
            p.closed = true;
            emit ProjectClosed(projectId, p.recipient, p.amount);

            // avoid reentrancy
            require(transferFrom(this, p.recipient, p.amount));
        }
    }

    // fallback just in case
    function () public {
        revert();
    }
}
