from brownie import InformedConsentFactoryContract

from .account_info import get_account


def read_all_patient_consent_contract():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract[-1]
    print("Contract Factory Address:", contract_factory_contract_address)

    (
        patient_ids,
        contract_addresses,
    ) = contract_factory_contract_address.getAllInformedConsentContracts()

    for pi, ca in zip(patient_ids, contract_addresses):
        print("\n")
        print("Patient ID:", pi)
        print("Contract Address:", ca)


def main():
    read_all_patient_consent_contract()
