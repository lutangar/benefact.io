pragma solidity ^0.4.24;

import './library/SafeMath.sol';
import './Owned.sol';
import './Token.sol';

/// @title Benefact.io is a donation platform
/// @author Johan Dufour
contract Benefactio is Token, Owned {
    uint public numProjects;
    bool public status;

    mapping (address => uint) public actorId;

    Project[] public projects;

    event ProjectAdded(uint projectId, address recipient, uint amount, string name, bool approved);
    event ProjectClosed(uint projectId, address recipient, uint amount);
    event ProjectStatus(uint projectId, bool approved);
    event NewDonation(uint donationId, uint projectId, address benefactor, uint amount, string message);
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

    /// @notice The constructor :)
    constructor() public {
        // the platform is closed by default
        close();
    }

    /// @notice The platform can be opened or closed to business, forbidding methods that write to the contract's storage
    function open() onlyOwner external {
        status = true;
        emit PlatformStatus(true);
    }

    /// @notice The platform can be opened or closed to business, forbidding methods that write to the contract's storage
    function close() onlyOwner public {
        status = false;
        emit PlatformStatus(false);
    }

    /// @notice Create a new project
    /// @param amount The amount of Wei required to fulfill the project (the goal)
    /// @param projectName The name of the project
    /// @param projectDescription The name project description
    function newProject(
        uint amount,
        string projectName,
        string projectDescription
    ) external returns (uint projectId) {
        // the platform must be open for business
        require(status = true);

        projectId = projects.length++;

        Project storage p = projects[projectId];
        p.recipient = msg.sender;
        p.amount = amount * 1 wei;
        p.name = projectName;
        p.description = projectDescription;
        p.projectHash = keccak256(abi.encodePacked(msg.sender, amount, projectName));
        p.closed = false;
        p.approved = false;

        emit ProjectAdded(projectId, p.recipient, amount, p.name, p.approved);
        numProjects = projectId + 1;

        return projectId;
    }

    /// @notice Approve a project, a project must be approved by the owner before receiving any donations
    /// @param projectId The project id
    function projectApprove(uint projectId) onlyOwner external {
        Project storage p = projects[projectId];

        // the project mustn't be approved already
        require(p.approved == false);
        p.approved = true;

        emit ProjectStatus(projectId, status);
    }

    /// @notice Verify the project integrity by recomputing its hash
    /// @param projectId The project id
    /// @param recipient The project creator
    /// @param amount The goal in Wei of the project
    /// @param name The name of the project
    function checkProjectHash (
        uint projectId,
        address recipient,
        uint amount,
        string name
    ) constant external returns (bool code) {
        Project storage p = projects[projectId];
        return p.projectHash == keccak256(abi.encodePacked(recipient, amount, name));
    }

    /// @notice Make a new donation to an existing project
    /// @param projectId The project id
    /// @param supportMessage A supportive message for the project creator
    function makeDonation(
        uint projectId,
        string supportMessage
    ) external payable returns (uint donationId) {
        // the platform must be open for business
        require(status = true);
        Project storage p = projects[projectId];

        require(
            msg.sender != p.recipient && // the sender can't make a donation to himself
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

        emit NewDonation(donationId, projectId, msg.sender, msg.value, supportMessage);
        return p.numberOfDonations;
    }

    /// @notice Get the number of donations on a project
    /// @param projectId The project id
    function getProjectDonationsCount(uint projectId) public constant returns (uint) {
        Project storage p = projects[projectId];

        return p.donations.length;
    }

    /// @notice Get a donation on a project
    /// @param projectId The project id
    /// @param donationId The donation id, start at 0
    function getProjectDonation(uint projectId, uint donationId) public constant returns (address benefactor, uint amount, string message) {
        Project storage p = projects[projectId];
        Donation storage d = p.donations[donationId];

        benefactor = d.benefactor;
        amount = d.amount;
        message = d.message;
    }

    /// @notice For a project creator only, claim the donations when the goal is reached
    /// @param projectId The project id
    function retrieveDonations(uint projectId) external onlyActor(projectId) {
        // the platform must be open for business
        require(status = true);

        Project storage p = projects[projectId];

        require(
            p.closed == false &&
            now > p.lastDonation + uint8(30) && // 2 blocks between must have passed between the last donation and the claim
            p.projectHash == keccak256(abi.encodePacked(p.recipient, p.amount, p.name))
        );

        if (p.currentAmount >= p.amount) {
            require(transferDonation(msg.sender, p.amount * 1 wei));

            p.closed = true;
            emit ProjectClosed(projectId, p.recipient, p.amount);
        }
    }

    /// @notice Fallback when nothing else match
    function () public {
        revert();
    }
}
