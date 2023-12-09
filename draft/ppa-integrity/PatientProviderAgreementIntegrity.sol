// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract PatientProviderAgreementIntegrity {
    //contract owner
    address owner = msg.sender;

    event PatientProviderAgreementHashEvent(string ppaID, string ppaHash);
    // mapping(address => bool) signed;

    struct PatientProviderAgreementHash {
        string ppaID;
        string ppaHash;
    }
    PatientProviderAgreementHash[] patientProviderAgreementHash;

    //modifier to control only owner can perform operations
    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function setPPAIntegrity(
        string memory _ppaId,
        string memory _ppaHash
    ) public {
        require(msg.sender == owner, "Not Contract Owner");
        patientProviderAgreementHash.push(
            PatientProviderAgreementHash(_ppaId, _ppaHash)
        );
        emit PatientProviderAgreementHashEvent(_ppaId, _ppaHash);
    } //end of setPolicyClassHash()

    function getPPAIntegrity(
        string memory _ppaId
    ) public view returns (string memory, string memory) {
        string memory _hash;

        for (uint i = 0; i < patientProviderAgreementHash.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(patientProviderAgreementHash[i].ppaID)
                ) == keccak256(abi.encodePacked(_ppaId))
            ) {
                _hash = patientProviderAgreementHash[i].ppaHash;
            }
        } //end of for loop
        return (_ppaId, _hash);
    } //end of getPolicyClassHash() function

    function updatePPAIntegrity(
        string memory _ppaId,
        string memory _newPPAHash
    ) public {
        require(msg.sender == owner, "Not Contract Owner");
        for (uint i = 0; i < patientProviderAgreementHash.length; i++) {
            if (
                keccak256(
                    abi.encodePacked(patientProviderAgreementHash[i].ppaID)
                ) == keccak256(abi.encodePacked(_ppaId))
            ) {
                patientProviderAgreementHash[i].ppaHash = _newPPAHash;
            }
        } //end of for loop
    } //end of updatePolicyClassHash() function
} //end of PolicyClassIntegrity contract
