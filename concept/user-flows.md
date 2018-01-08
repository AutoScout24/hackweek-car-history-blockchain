# User Flows

## Get information about a car

- 1.) User chooses a verifier institution of his choice and visits its website/interface
- 2.) User enters VIN of the car to check
    - Verifier needs to lookup in its non blockchain database to find the contract address for this
    - If the user knows the contract address already no need to go to the verifier institution. Any interface can be used.
- 3.) If a contract could be found, fetch the information from the contract and its logs and present it to the user.
    - Verifier Institutions must be asked if the log entry authors and contract owner are verified.
- 4.) If the user wants to get the attached metadata details of a log entry redirect him to the corresponding verifier. Verifier that stores this metadata might use a "paywall" to restrict access to the detailed data. (Refinance storage costs)


## Transfer Car Ownership

- 1.) Current owner "logs in" with his private/public key. Might be via Metamask, verifier node or own node.
- 2.) Enters required data (e.g. address of new owner) for the transfer in an web interface and submits the transaction.
- 3.) Future owner "logs in" with his private/public key.
- 4.) Submits accepting transaction on the car contract.

Note: The information of the new owner must be known somehow by the current owner. Also the new owner must know the car contract address. This information transfer can happen manually or also within the system of a verifier.

## Propose and Accept Metadata



## Verify End-User

TBD

Note: Which end users are verified is not stored on the blockchain but by the individual verfier institutions. This has the following reasons:
- Storing a table with that many verified accounts on the blockchain might get expensive.
- Personal user data (name, address, ...) cannot be stored in the blockchain because of data protection issues. The data would be publicly readable and not fully deletable. This violates EU laws.
- If verifier institutions are responsible for storing the data about their verified user they can be held accountable for it easier (I guess). 
