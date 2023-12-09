from web3 import Web3
from web3.middleware import geth_poa_middleware

# Replace with your Goerli Ethereum node URL
w3 = Web3(Web3.HTTPProvider('https://goerli.infura.io/v3/YOUR_INFURA_PROJECT_ID'))

# Replace with your contract address
contract_address = "0x4bD7677501477912800db171ccbe2B9846959af7"

# Replace with your private key
private_key = "3ee74c9f18454a847c525f2813a7a8e6893055b8547a9b122e5a9aa53cda5f5e"

# ABI for the smart contract (you can obtain this from the contract deployment)
contract_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_subject",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_action",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_object",
				"type": "string"
			}
		],
		"name": "addInformedConsentRecord",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllInformedConsents",
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
				"internalType": "string",
				"name": "_object",
				"type": "string"
			}
		],
		"name": "getConsentsByObject",
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
		"name": "getConsentsForRead",
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
		"name": "getConsentsForUpdate",
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
		"name": "getConsentsForWrite",
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
		"name": "getPatientId",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
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
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_newPatientId",
				"type": "string"
			}
		],
		"name": "setPatientId",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

contract = w3.eth.contract(address=contract_address, abi=contract_abi)

# Unlock your account to send the transaction
w3.middleware_onion.add(geth_poa_middleware)

# Replace with your Ethereum address
your_address = "0x7679788512D3c14489f183c8F85E4c1337ce965E"

# Replace this list with your data
data_list = [
    ("Alice", "Read", "File1"),
    ("Bob", "Write", "File2"),
    ("Charlie", "Update", "File3"),
]

for data in data_list:
    subject, action, obj = data
    transaction = contract.functions.addInformedConsentRecord(subject, action, obj).buildTransaction({
        'chainId': 5,  # Goerli network ID
        'gas': 2000000,
        'gasPrice': w3.toWei('20', 'gwei'),
        'nonce': w3.eth.getTransactionCount(your_address),
    })

    signed_transaction = w3.eth.account.signTransaction(transaction, private_key)
    tx_hash = w3.eth.sendRawTransaction(signed_transaction.rawTransaction)

    # Wait for the transaction to be mined
    w3.eth.waitForTransactionReceipt(tx_hash)

print("Informed consent records added to the contract.")
