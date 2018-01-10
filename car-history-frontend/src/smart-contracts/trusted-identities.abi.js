module.exports = [
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "trustedIdentities",
    "outputs": [
      {
        "name": "trustLevel",
        "type": "uint8"
      },
      {
        "name": "name",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "identity",
        "type": "address"
      },
      {
        "name": "level",
        "type": "uint8"
      },
      {
        "name": "name",
        "type": "string"
      }
    ],
    "name": "setTrustLevel",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "admin",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  }
];
