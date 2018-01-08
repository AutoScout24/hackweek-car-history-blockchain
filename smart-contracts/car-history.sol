pragma solidity ^0.4.19;

contract CarHistory {

    struct ProposedLogEntry {
        address author;
        uint mileage;
        string comment;
        bool accepted;
    }

    address public owner;
    uint public latestMileage;
    string public VIN;

    ProposedLogEntry public latestProposedLogEntry;

    event LogEntry(address author, uint mileage, string comment);

    function CarHistory(address _owner, uint _mileage, string _VIN) public { // Constructor
        owner = _owner;
        latestMileage = _mileage;
        VIN = _VIN;
    }

    function proposeLogEntry(uint mileage, string comment) public {
        latestProposedLogEntry = ProposedLogEntry(msg.sender, mileage, comment, false);
    }

    function approveLogEntry() public {
        require(msg.sender == owner);               // Only allow the owner to accept a log entry
        require(!latestProposedLogEntry.accepted);  // Do not accept the same log entry twice

        LogEntry(latestProposedLogEntry.author, latestProposedLogEntry.mileage, latestProposedLogEntry.comment);
        latestProposedLogEntry.accepted = true;
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner);               // Only allow the owner to transfer ownership

        owner = newOwner;
    }
}
