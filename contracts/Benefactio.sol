pragma solidity ^0.4.17;

contract Benefactio {
     struct Benefactor {
         address addr;
         uint amount;
     }

     struct Project {
         string name;
         string description;
         uint goal;
         address beneficiary;

         uint benefactorsCount;
         uint amount;
         mapping (uint => Benefactor) benefactors;
     }

     uint projectsCount;
     Project[] public projects;

     function createProject(string name, string description, uint goal) public returns (uint index) {
         index = projectsCount++; // projectIndex is return variable
         // Creates new struct and saves in storage. We leave out the mapping type.
         projects[index] = Project(name, description, goal, msg.sender, 0, 0);
     }

    function getProjectsCount() public constant returns(uint) {
        return projects.length;
    }

    function getProject(uint index) public constant returns(address, uint, uint, uint) {
        return (projects[index].beneficiary, projects[index].goal, projects[index].benefactorsCount, projects[index].amount);
    }

     function donate(uint projectID) public payable {
         Project storage c = projects[projectID];
         // Creates a new temporary memory struct, initialised with the given values
         // and copies it over to storage.
         // Note that you can also use Benefactor(msg.sender, msg.value) to initialise.
         c.benefactors[c.benefactorsCount++] = Benefactor({addr: msg.sender, amount: msg.value});
         c.amount += msg.value;
     }

     function checkGoalReached(uint projectID) public returns (bool reached) {
         Project storage c = projects[projectID];
         if (c.amount < c.goal)
             return false;
         uint amount = c.amount;
         c.amount = 0;
         c.beneficiary.transfer(amount);
         return true;
     }
}
