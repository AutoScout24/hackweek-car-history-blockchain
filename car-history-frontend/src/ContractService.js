import Web3 from 'web3';
import contractABI from './smart-contracts/car-histroy.abi';
import contractBytecode from './smart-contracts/car-history.bytecode';
import {UseGivenProvider} from "./FeatureSwitches";

const defaultGasPrice = '300000000000';
const defaultGasVolume = '4000000';

export default class ContractService {

    constructor() {
      if (UseGivenProvider) {
        this.web3 = new Web3(Web3.givenProvider);
      } else {
        this.web3 = new Web3('http://ec2-34-242-87-218.eu-west-1.compute.amazonaws.com:8545/');
      }
    }

    // For use with "givenProvider".
    loadAccounts() {
      return this.web3.eth.getAccounts()
        .then((accounts) => {
          this.account = (accounts[0]);
          return this.account;
        }).catch((e) => {
          console.log("Error in getting account", e);
        });
    }

    switchAccount(key) {
        if (key) {
            this.account = this.web3.eth.accounts.privateKeyToAccount(key);
        } else {
            this.account = undefined;
        }
    }

    deployContract(data) {
        if (!this.account) {
            Promise.reject("No active account");
        }

        const contract = new this.web3.eth.Contract(contractABI,
            null, {
                gas: defaultGasVolume,
                gasPrice: defaultGasPrice,
                data: contractBytecode.object
            });

        let transactionPromise;
        if (UseGivenProvider) {
          transactionPromise = contract
            .deploy({arguments: [this.account, data.mileage, data.vin]})
            .send({from: this.account})
        } else {
          const transaction = contract.deploy({
            arguments: [this.account.address, data.mileage, data.vin]
          });
          transaction.gas = defaultGasVolume;

          transactionPromise = this.account.signTransaction(transaction)
            .then((signed) => {
              return this.web3.eth.sendSignedTransaction(signed.rawTransaction)
            })
        }

        return transactionPromise
            .then((contract) => {
                if (typeof contract.options.address !== 'undefined') {
                    console.log('Contract mined! address: ' + contract.options.address);
                }
                return contract;
            })
    }

    getContractAtAddress(address) {
      return new this.web3.eth.Contract(contractABI, address)
    }

  readContractData(address) {
    try {
      const contract = this.getContractAtAddress(address);
      return Promise.all([
        contract.methods.VIN().call(),
        contract.methods.owner().call(),
        contract.methods.latestMileage().call(),
        this.getLogEntries(address)
      ])
      .then((data) => ({
        VIN: data[0],
        owner: data[1],
        latestMileage: data[2],
        logEntries: data[3]
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  }

    async getLogEntries(address) {
      // TODO: reading from internal array instead of logs for now.
      // This is due to metamask not yet supporting logs/events via web3.js 1.0.
      // (see https://github.com/MetaMask/metamask-extension/issues/2350)
      const contract = this.getContractAtAddress(address);
      const numLogEntries = await contract.methods.getNumOfApprovedLogEntries().call();
      let logEntriesPromises = [];
      for(let i = 0; i < numLogEntries; i++) {
        logEntriesPromises.push(contract.methods.approvedLogEntries(i).call());
      }
      return Promise.all(logEntriesPromises);
    }

    getProposalData(address) {
      return this.getContractAtAddress(address).methods
        .latestProposedLogEntry().call()
    }

    proposeLogEntry(address, data) {
      return this.getContractAtAddress(address).methods
        .proposeLogEntry(data.mileage, data.comment)
        .send({from: this.account, gas: defaultGasVolume, gasPrice: defaultGasPrice})
        .then((event) => {
          console.log(event);
          console.log(event.transactionHash);
          return event.transactionHash;
        });
    }

  approveProposedLogEntry(address) {
    return this.getContractAtAddress(address).methods
      .approveLogEntry()
      .send({from: this.account, gas: defaultGasVolume, gasPrice: defaultGasPrice})
      .then((event) => {
        console.log(event);
        return
      });
  }
}


