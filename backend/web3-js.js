const {ethers}  = require("ethers");
const provider = new ethers.providers.JsonRpcProvider(`https://polygon-mumbai.infura.io/v3/76debb7a5675470dbd61b95a54774843`);
const contractAddress = '0xc99D16cddf44502a4F1959325d6aBB9AD5fCbC90';
const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "object",
            "type": "string"
          }
        ],
        "internalType": "struct InformedConsentContract.InformedConsent[]",
        "name": "_consents",
        "type": "tuple[]"
      }
    ],
    "name": "addMultipleInformedConsents",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_subject",
        "type": "string"
      }
    ],
    "name": "getConsentsBySubject",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "object",
            "type": "string"
          }
        ],
        "internalType": "struct InformedConsentContract.InformedConsent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getConsentsLength",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "subject",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "action",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "object",
            "type": "string"
          }
        ],
        "internalType": "struct InformedConsentContract.InformedConsent[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "informedConsents",
    "outputs": [
      {
        "internalType": "string",
        "name": "subject",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "action",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "object",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
  // Add the rest of your ABI here
];
const contract = new ethers.Contract(contractAddress, contractABI, provider);
async function getConsentsBySubject(subject) {
  try {
    const consents = await contract.getConsentsBySubject(subject);
    console.log('Consents:', consents);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
async function getConsentsLength() {
  try {
    const consentsLength = await contract.getConsentsLength();
    console.log('Consents Length:', consentsLength);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
async function getInformedConsentByIndex(index) {
  try {
    const consent = await contract.informedConsents(index);
    console.log('Informed Consent at index', index, ':', consent);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
async function run() {
  try {
    const subject = 'EC1004';
    await getInformedConsentByIndex(32);
  } catch (error) {
    console.error('Error:', error.message);
  }
}
run();
