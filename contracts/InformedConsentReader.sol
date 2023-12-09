// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Interface for the InformedConsentContract
interface IInformedConsentContract {
    function getPatientId() external view returns (string memory);
    // Add other function signatures that you need from the InformedConsentContract
}

// Interface for the InformedConsentFactoryContract
interface IInformedConsentFactoryContract {
    function getDeployedContracts() external view returns (address[] memory);
}

// Contract that interacts with the deployed InformedConsentContracts
contract InformedConsentReader {
    IInformedConsentFactoryContract public factoryContract;

    // Initialize the contract with the InformedConsentFactoryContract's address
    constructor(address _factoryContractAddress) {
        factoryContract = IInformedConsentFactoryContract(
            _factoryContractAddress
        );
    }

    // Function to retrieve patientIds from all deployed InformedConsentContracts
    function getAllPatientIds() public view returns (string[] memory) {
        // Get the deployed contracts' addresses
        address[] memory deployedContracts = factoryContract
            .getDeployedContracts();
        string[] memory patientIds = new string[](deployedContracts.length);

        // Interact with each deployed InformedConsentContract
        for (uint i = 0; i < deployedContracts.length; i++) {
            IInformedConsentContract consentContract = IInformedConsentContract(
                deployedContracts[i]
            );
            patientIds[i] = consentContract.getPatientId();
            // Call other functions as needed
        }

        return patientIds;
    }

    // Add other functions to interact with the InformedConsentContracts as needed
}
