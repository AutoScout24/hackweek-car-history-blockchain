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

    ProposedLogEntry[] public approvedLogEntries;
    event LogEntry(address author, uint mileage, string comment);

    function CarHistory(address _owner, uint _mileage, string _VIN) public { // Constructor
        owner = _owner;
        latestMileage = _mileage;
        VIN = _VIN;

        approvedLogEntries.push(ProposedLogEntry(_owner, _mileage, "Created", true));
        LogEntry(_owner, _mileage, "Created");
    }

    function proposeLogEntry(uint mileage, string comment) public {
        latestProposedLogEntry = ProposedLogEntry(msg.sender, mileage, comment, false);
    }

    function approveLogEntry() public {
        require(msg.sender == owner);               // Only allow the owner to accept a log entry
        require(!latestProposedLogEntry.accepted);  // Do not accept the same log entry twice

        if(latestMileage < latestProposedLogEntry.mileage) {
            latestMileage = latestProposedLogEntry.mileage;
        }

        // Keeping a list of accepted log entries in addition to the events is just a workaround.
        // MetaMask cannot provide events when using web3.js 1.0 for now.
        // (see https://github.com/MetaMask/metamask-extension/issues/2350)
        approvedLogEntries.push(ProposedLogEntry(latestProposedLogEntry.author, latestProposedLogEntry.mileage, latestProposedLogEntry.comment, true));
        LogEntry(latestProposedLogEntry.author, latestProposedLogEntry.mileage, latestProposedLogEntry.comment);
        latestProposedLogEntry.accepted = true;
    }

    function getNumOfApprovedLogEntries() public view returns (uint) {
        return approvedLogEntries.length;
    }

    function transferOwnership(address newOwner) public {
        require(msg.sender == owner);               // Only allow the owner to transfer ownership

        owner = newOwner;
    }
}
