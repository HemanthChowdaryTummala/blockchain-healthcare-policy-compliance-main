from brownie import InformedConsentFactoryContract

from .account_info import get_account


def deploy_patient_informed_consent_contract():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract[-1]
    print("Contract Factory Address:", contract_factory_contract_address)

    contract_factory_contract_address.createOrRetrieveContract(
        "PT1001", {"from": account}
    )


def main():
    deploy_patient_informed_consent_contract()
