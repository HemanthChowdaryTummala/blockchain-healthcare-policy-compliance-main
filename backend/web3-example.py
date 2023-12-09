from web3 import Web3
infura_url = 'https://polygon-mainnet.infura.io/v3/76debb7a5675470dbd61b95a54774843';
web3 = Web3(Web3.HTTPProvider(infura_url))
print(web3.eth.get_block(12345))
# # Replace with your contract address and ABI
# contract_address = '0xc99D16cddf44502a4F1959325d6aBB9AD5fCbC90'
# contract_abi = [
#     {
#         "inputs": [],
#         "stateMutability": "nonpayable",
#         "type": "constructor"
#     },
#     {
#         "inputs": [
#             {
#                 "components": [
#                     {
#                         "internalType": "string",
#                         "name": "subject",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "action",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "object",
#                         "type": "string"
#                     }
#                 ],
#                 "internalType": "struct InformedConsentContract.InformedConsent[]",
#                 "name": "_consents",
#                 "type": "tuple[]"
#             }
#         ],
#         "name": "addMultipleInformedConsents",
#         "outputs": [],
#         "stateMutability": "nonpayable",
#         "type": "function"
#     },
#     {
#         "inputs": [
#             {
#                 "internalType": "string",
#                 "name": "_subject",
#                 "type": "string"
#             }
#         ],
#         "name": "getConsentsBySubject",
#         "outputs": [
#             {
#                 "components": [
#                     {
#                         "internalType": "string",
#                         "name": "subject",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "action",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "object",
#                         "type": "string"
#                     }
#                 ],
#                 "internalType": "struct InformedConsentContract.InformedConsent[]",
#                 "name": "",
#                 "type": "tuple[]"
#             }
#         ],
#         "stateMutability": "view",
#         "type": "function"
#     },
#     {
#         "inputs": [],
#         "name": "getConsentsLength",
#         "outputs": [
#             {
#                 "components": [
#                     {
#                         "internalType": "string",
#                         "name": "subject",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "action",
#                         "type": "string"
#                     },
#                     {
#                         "internalType": "string",
#                         "name": "object",
#                         "type": "string"
#                     }
#                 ],
#                 "internalType": "struct InformedConsentContract.InformedConsent[]",
#                 "name": "",
#                 "type": "tuple[]"
#             }
#         ],
#         "stateMutability": "view",
#         "type": "function"
#     },
#     {
#         "inputs": [
#             {
#                 "internalType": "uint256",
#                 "name": "",
#                 "type": "uint256"
#             }
#         ],
#         "name": "informedConsents",
#         "outputs": [
#             {
#                 "internalType": "string",
#                 "name": "subject",
#                 "type": "string"
#             },
#             {
#                 "internalType": "string",
#                 "name": "action",
#                 "type": "string"
#             },
#             {
#                 "internalType": "string",
#                 "name": "object",
#                 "type": "string"
#             }
#         ],
#         "stateMutability": "view",
#         "type": "function"
#     },
#     {
#         "inputs": [],
#         "name": "owner",
#         "outputs": [
#             {
#                 "internalType": "address",
#                 "name": "",
#                 "type": "address"
#             }
#         ],
#         "stateMutability": "view",
#         "type": "function"
#     }
# ]

# contract = web3.eth.contract(address=contract_address, abi=contract_abi)

# # Corrected line: Call buildTransaction on the contract instance
# function_data = contract.functions.getConsentsLength().buildTransaction({'gas': 2000000, 'gasPrice': web3.toWei('50', 'gwei')})['data']

# result = web3.eth.call({'to': contract_address, 'data': function_data})
# decoded_result = contract.functions.getConsentsLength().decode_function_input(result)
# print(decoded_result)
