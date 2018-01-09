import Web3 from 'web3';

export default class ContractService {

    constructor() {
        // change to https or ws provider after local node is created
        this.web3 = new Web3(Web3.givenProvider);

        // implement switch account logic
        this.web3.eth.getAccounts()
        .then((accounts) => {
          this.account = (accounts[0]);
        }).catch((e) =>{
            console.log("Error in getting account");
        });
    }

    deployContract(data) {
        if (!this.account) {
            return;
        }

        const exampleContractABIInterface = [{
            "constant": false,
            "inputs": [{"name": "to", "type": "address"}],
            "name": "delegate",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": true,
            "inputs": [],
            "name": "winningProposal",
            "outputs": [{"name": "_winningProposal", "type": "uint8"}],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "toVoter", "type": "address"}],
            "name": "giveRightToVote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "constant": false,
            "inputs": [{"name": "toProposal", "type": "uint8"}],
            "name": "vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"name": "_numProposals", "type": "uint8"}],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        }];
        const exampleContractBytecode = '0x6060604052341561000f57600080fd5b60405160208061085883398101604052808051906020019091905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060018060008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166002816100e491906100eb565b505061013e565b815481835581811511610112578183600052602060002091820191016101119190610117565b5b505050565b61013b91905b80821115610137576000808201600090555060010161011d565b5090565b90565b61070b8061014d6000396000f300606060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680635c19a95c14610067578063609ff1bd146100a05780639e7b8d61146100cf578063b3f98adc14610108575b600080fd5b341561007257600080fd5b61009e600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061012e565b005b34156100ab57600080fd5b6100b3610481565b604051808260ff1660ff16815260200191505060405180910390f35b34156100da57600080fd5b610106600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506104ff565b005b341561011357600080fd5b61012c600480803560ff169060200190919050506105fc565b005b600080600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002091508160010160009054906101000a900460ff161561018e5761047c565b5b600073ffffffffffffffffffffffffffffffffffffffff16600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141580156102bc57503373ffffffffffffffffffffffffffffffffffffffff16600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614155b1561032b57600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160029054906101000a900473ffffffffffffffffffffffffffffffffffffffff16925061018f565b3373ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156103645761047c565b60018260010160006101000a81548160ff021916908315150217905550828260010160026101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff161561046457816000015460028260010160019054906101000a900460ff1660ff1681548110151561044457fe5b90600052602060002090016000016000828254019250508190555061047b565b816000015481600001600082825401925050819055505b5b505050565b6000806000809150600090505b6002805490508160ff1610156104fa578160028260ff168154811015156104b157fe5b90600052602060002090016000015411156104ed5760028160ff168154811015156104d857fe5b90600052602060002090016000015491508092505b808060010191505061048e565b505090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415806105a75750600160008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff165b156105b1576105f9565b60018060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b50565b6000600160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff168061066457506002805490508260ff1610155b1561066e576106db565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460028360ff168154811015156106bf57fe5b9060005260206000209001600001600082825401925050819055505b50505600a165627a7a7230582017ee0af5564bb847be9cfaa0c73ccfba9cf9b78d874207308ef2139ab29215680029';

        const contract = new this.web3.eth.Contract(exampleContractABIInterface,
            null, {
                gas: '4700000',
                gasPrice: '300000000000',
                data: exampleContractBytecode
            });
        contract
            .deploy({arguments: [8]})
            .send({from: this.account})
            .then((contract) => {
                console.log(contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address
                        + ' transactionHash: ' + contract.transactionHash);
                }
            })
    }

}

