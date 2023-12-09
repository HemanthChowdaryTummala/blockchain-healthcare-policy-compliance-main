from brownie import InformedConsentReader, InformedConsentFactoryContract
from .account_info import get_account


def read_all_deployed_consent_contract():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract[-1]

    reader_contract_address = InformedConsentReader.deploy(
        contract_factory_contract_address, {"from": account}
    )
    # 0xaCFEaC19B51562CB3A4415900AfA8849a524D6C7
    print(reader_contract_address)


def read_all_patient_id():
    reader_contract_address = InformedConsentReader[-1]
    print(reader_contract_address)  # 0xaCFEaC19B51562CB3A4415900AfA8849a524D6C7
    print(reader_contract_address.getAllPatientIds())


def main():
    # read_all_deployed_consent_contract()
    read_all_patient_id()
