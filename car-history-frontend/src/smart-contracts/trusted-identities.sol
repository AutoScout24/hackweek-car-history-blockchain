pragma solidity ^0.4.19;

contract TrustedIdentities {

    struct TrustEntry {
        TrustLevel trustLevel;
        string name;
    }

    enum TrustLevel { Fraud, Verified, Admin, Unknown }

    mapping(address => TrustEntry) public trustedIdentities;

    function TrustedIdentities(address admin) public { // Constructor
        trustedIdentities[admin] = TrustEntry(TrustLevel.Admin, "Root");
    }

    function setTrustLevel(address identity, TrustLevel level, string name) public {
        require(trustedIdentities[msg.sender].trustLevel == TrustLevel.Admin);

        trustedIdentities[identity] = TrustEntry(level, name);
    }
}
