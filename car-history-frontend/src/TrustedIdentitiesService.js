import contractABI from './smart-contracts/trusted-identities.abi';
import contractBytecode from './smart-contracts/trusted-identities.bytecode';

const defaultGasPrice = '300000000000';
const defaultGasVolume = '4000000';

export const TrustLevelEnum = {
  Unknown: 0,
  Fraud: 1,
  Verified: 2,
  Admin: 3,
};

export default class TrustedIdentitiesService {
  static defaultService;

  constructor(contractService, trustStoreAddress) {
    this.contractService = contractService;

    if (trustStoreAddress) {
      this.contract = new this.contractService.web3.eth.Contract(contractABI, trustStoreAddress);
    }
  }

  deployNewTrustStore() {
    if (!this.contractService.getCurrentAccountAddress()) {
      Promise.reject("No active account");
    }

    this.contract = new this.contractService.web3.eth.Contract(contractABI,
      null, {
        gas: defaultGasVolume,
        gasPrice: defaultGasPrice,
        data: contractBytecode.object
      });
    return this.contract
      .deploy({arguments: [this.contractService.getCurrentAccountAddress()]})
      .send({from: this.contractService.getCurrentAccountAddress()})
      .then((contract) => {
        this.contract = contract;
        if (typeof contract.options.address !== 'undefined') {
          console.log('Trust store mined! address: ' + contract.options.address);
        }
        return contract;
      })
  }

  isTrustStoreSetUp() {
    return !!this.contract;
  }

  getVerificationStatus(addressToVerify){
    return this.contract.methods
      .trustedIdentities(addressToVerify).call()
  }

  setVerificationStatus(addressToVerify, status, name) {
    return this.getVerificationStatus(this.contractService.getCurrentAccountAddress())
      .then((data) => {
        if(parseInt(data.trustLevel, 10) !== TrustLevelEnum.Admin) {
          throw new Error("Only permitted by admins!")
        }
      })
      .then(() => {
        return this.contract.methods
          .setTrustLevel(addressToVerify, parseInt(status, 10), name)
          .send({from: this.contractService.getCurrentAccountAddress(), gas: defaultGasVolume, gasPrice: defaultGasPrice})
      })
      .then((event) => {
        return event.transactionHash;
      });
  }
}
