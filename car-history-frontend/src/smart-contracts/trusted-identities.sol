pragma solidity ^0.4.19;

contract TrustedIdentities {

    struct TrustEntry {
        TrustLevel trustLevel;
        string name;
    }

    enum TrustLevel { Unknown, MaliciousActor, TrustworthyOwner, TrustworthyWorkshop, PrivilegedAuthority }

    mapping(address => TrustEntry) public trustedIdentities;

    function TrustedIdentities(address admin) public { // Constructor
        trustedIdentities[admin] = TrustEntry(TrustLevel.PrivilegedAuthority, "Root");
    }

    function setTrustLevel(address identity, TrustLevel level, string name) public {
        require(trustedIdentities[msg.sender].trustLevel == TrustLevel.PrivilegedAuthority);

        trustedIdentities[identity] = TrustEntry(level, name);
    }
}
