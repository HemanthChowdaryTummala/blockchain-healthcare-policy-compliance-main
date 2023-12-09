from brownie import InformedConsentFactoryContract

from .account_info import get_account


def read_patient_all_consent_contract():
    account = get_account()

    contract_factory_contract_address = InformedConsentFactoryContract[-1]
    print("Contract Factory Address:", contract_factory_contract_address)

    patient_id = "PT1001"

    (
        given_patient_id,
        patient_contract_addresses,
    ) = contract_factory_contract_address.getPatientContractAddress(patient_id)

    print("Patient ID:", given_patient_id)
    print("Contract Address:", patient_contract_addresses)

    print(patient_contract_addresses.getAllInformedConsents())


def main():
    read_patient_all_consent_contract()
