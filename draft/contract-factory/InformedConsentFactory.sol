// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./InformedConsent.sol";

/**
 * @title InformedConsentFactoryContract
 * @dev This contract allows for the creation of new InformedConsentContract instances
 * and provides lookup functionality by patient ID.
 */
contract InformedConsentFactoryContract is InformedConsentContract {
    // Define a structure to hold patient contracts data
    struct PatientContract {
        string patientID; // ID of the patient
        address patientContractAddress; // Address of the contract related to the patient
    }

    // An array to store the PatientContract structs.
    PatientContract[] private patientContracts;

    /**
     * @notice Create or retrieve the patient's informed consent contract.
     * @dev Iterates through `patientContracts` to check if a contract exists for the given patient ID.
     * If it exists, returns the address and a message. If not, creates a new contract.
     * @param _patientID Unique identifier for a patient.
     * @return contractAddress The address of the contract.
     * @return message A message indicating the action performed.
     */
    function createOrRetrieveContract(
        string memory _patientID
    ) public returns (address contractAddress, string memory message) {
        require(bytes(_patientID).length > 0, "Patient ID is empty");

        // Check if a contract already exists for the patient
        for (uint i = 0; i < patientContracts.length; i++) {
            if (
                keccak256(abi.encodePacked(patientContracts[i].patientID)) ==
                keccak256(abi.encodePacked(_patientID))
            ) {
                // If a contract exists, return its address and a message
                return (
                    patientContracts[i].patientContractAddress,
                    "Contract exists already"
                );
            }
        }

        // If no contract exists, create a new one
        InformedConsentContract newContract = new InformedConsentContract();
        PatientContract memory newPatientContract = PatientContract({
            patientID: _patientID,
            patientContractAddress: address(newContract)
        });
        patientContracts.push(newPatientContract);

        // Return the address of the new contract and a message
        return (address(newContract), "New contract created");
    }

    /**
     * @dev Retrieve the patient ID and contract address for a specific patient using their ID.
     * @param _patientID The ID of the patient to retrieve the contract address for.
     * @return patientContractAddress The address of the deployed patient contract.
     */
    function getPatientContractAddress(
        string memory _patientID
    ) public view returns (address patientContractAddress) {
        require(bytes(_patientID).length > 0, "Patient ID is empty");

        // Loop through the array of patientContracts to find a match for _patientID
        for (uint i = 0; i < patientContracts.length; i++) {
            if (
                keccak256(abi.encodePacked(patientContracts[i].patientID)) ==
                keccak256(abi.encodePacked(_patientID))
            ) {
                return (patientContracts[i].patientContractAddress);
            }
        }
        revert("No contract found for the provided patient ID");
    }

    /**
     * @dev Retrieve all stored patient IDs and their associated contract addresses.
     * @return patientIDs An array of all stored patient IDs.
     * @return contractAddresses An array of all stored contract addresses.
     */
    function getAllInformedConsentContracts()
        public
        view
        returns (string[] memory patientIDs, address[] memory contractAddresses)
    {
        patientIDs = new string[](patientContracts.length);
        contractAddresses = new address[](patientContracts.length);

        // Populate the output arrays with data from patientContracts
        for (uint i = 0; i < patientContracts.length; i++) {
            patientIDs[i] = patientContracts[i].patientID;
            contractAddresses[i] = patientContracts[i].patientContractAddress;
        }

        return (patientIDs, contractAddresses);
    }

    /**
     * @notice Adds an informed consent record to the specified patient's contract.
     * @dev Takes the patient's ID, subject, action, and object of the informed consent,
     * retrieves the corresponding patient contract, and stores the informed consent record.
     * @param _patientID The ID of the patient.
     * @param _subject The subject of the informed consent.
     * @param _action The action of the informed consent.
     * @param _object The object of the informed consent.
     */
    function addInformedConsent(
        string memory _patientID,
        string memory _subject,
        string memory _action,
        string memory _object
    ) public {
        // Retrieve the address of the patient's contract
        address patientContractAddress = getPatientContractAddress(_patientID);
        require(
            patientContractAddress != address(0),
            "Patient contract does not exist"
        );

        // Instantiate the InformedConsentContract using the retrieved address
        InformedConsentContract patientContract = InformedConsentContract(
            patientContractAddress
        );

        // Call the addInformedConsentRecord function of the patient's contract
        patientContract.addInformedConsentRecord(_subject, _action, _object);
    }
}
