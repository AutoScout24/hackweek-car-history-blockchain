module.exports = [
  {
    "constant": true,
    "inputs": [],
    "name": "getNumOfApprovedLogEntries",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
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
        "name": "newOwner",
        "type": "address"
      },
      {
        "name": "mileage",
        "type": "uint256"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "approvedLogEntries",
    "outputs": [
      {
        "name": "author",
        "type": "address"
      },
      {
        "name": "mileage",
        "type": "uint256"
      },
      {
        "name": "comment",
        "type": "string"
      },
      {
        "name": "accepted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "VIN",
    "outputs": [
      {
        "name": "",
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
        "name": "mileage",
        "type": "uint256"
      },
      {
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "proposeLogEntry",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "approveLogEntry",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "latestProposedLogEntry",
    "outputs": [
      {
        "name": "author",
        "type": "address"
      },
      {
        "name": "mileage",
        "type": "uint256"
      },
      {
        "name": "comment",
        "type": "string"
      },
      {
        "name": "accepted",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "latestMileage",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_mileage",
        "type": "uint256"
      },
      {
        "name": "_VIN",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "author",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "mileage",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "comment",
        "type": "string"
      }
    ],
    "name": "LogEntry",
    "type": "event"
  }
];
