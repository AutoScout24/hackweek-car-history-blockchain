import Web3 from 'web3';
import contractABI from './smart-contracts/car-histroy.abi';
import contractBytecode from './smart-contracts/car-history.bytecode';

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

        const contract = new this.web3.eth.Contract(contractABI,
            null, {
                gas: '4700000',
                gasPrice: '300000000000',
                data: contractBytecode.object
            });
        contract
            .deploy({arguments: [this.account, 100, data.vin]})
            .send({from: this.account})
            .then((contract) => {
                console.log(contract);
                if (typeof contract.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.address
                        + ' transactionHash: ' + contract.transactionHash);
                }
            })
    }

    getContractAtAddress(address) {
      return new this.web3.eth.Contract(contractABI, address)
    }

    readContractData(address) {
      const contract = this.getContractAtAddress(address);
      return Promise.all([
          contract.methods.VIN().call(),
          contract.methods.owner().call(),
          contract.methods.latestMileage().call()
        ])
        .then((data) => ({
          VIN: data[0],
          owner: data[1],
          latestMileage: data[2],
          logEntries: []
        }))
    }
}


