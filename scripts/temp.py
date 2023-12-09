from brownie import accounts, config, PatientProviderAgreementIntegrity, network


def patient_provider_agreement_integrity_contract():
    account = get_account()
    PatientProviderAgreementIntegrity.deploy({"from": account})


def get_account():
    if network.show_active() == "development":
        return accounts[0]
    else:
        return accounts.add(config["wallets"]["from_key"])


def main():
    patient_provider_agreement_integrity_contract()
