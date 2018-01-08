# Data Structures

## Car Contract Data (on blockchain)

- VIN (String/Int/Byte ?)
- LatestMileage (UInt)
- LatestOwner (Address)

- *ProposedFutureOwner* (Address)
- *ProposedMetaDataEntry* (Array of Hashes)

### Log Entries (on blockchain)

- Author (Address)
- Mileage (UInt)
- Comment (String (limited length))


- MetaDataStorageProvider (Address)
- MetaDataHash (Byte)


## Verifier Registry (on blockchain)

- Verifiers (Array of (Address, URL-Endpoint, Name)

- *ProposedNewVerifiers* (Array of (Address, URL-Endpoint, Name))


## Verifier Car Data (off blockchain)

- List of known cars aka car contracts
- MetaData for each car contract

