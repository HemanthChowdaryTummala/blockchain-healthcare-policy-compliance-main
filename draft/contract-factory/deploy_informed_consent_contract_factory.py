from brownie import InformedConsentFactoryContract
from ..scripts.account_info import get_account


patient_id = [
    "PT1001",
    "PT1002",
    "PT1003",
    "PT1004",
    "PT1005",
    "PT1006",
    "PT1007",
    "PT1008",
    "PT1009",
    "PT1010",
]


def informed_consent_conttract_factory_deployment():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract.deploy(
        {"from": account}
    )
    print("Contract Factory Address:", contract_factory_contract_address)

    for id in patient_id:
        output = contract_factory_contract_address.createOrRetrieveContract(
            id, {"from": account}
        )
        print(output)


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


def add_informed_consent():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract[-1]
    # 0xdB61a6D506BB5f02f0f9dC60bdF6c847f53D3B86
    print("Contract Factory Address:", contract_factory_contract_address)

    # patienID = "PT1001"
    # subject = "PR1001"
    # action = "Read"
    # object = "HR1001"

    # contract_factory_contract_address.addInformedConsent(
    #     patienID, subject, action, object, {"from": account}
    # )

    patienID = "PT1010"
    consent = []
    ic1 = [patienID, "Read", "HR1001"]
    consent.append(ic1)
    ic2 = ["PR1002", "Read", "HR1001"]
    consent.append(ic2)
    ic3 = ["PR1002", "Read", "HR1001"]
    consent.append(ic3)

    ic4 = [patienID, "Write", "HR1001"]
    consent.append(ic4)
    ic5 = ["PR1002", "Write", "HR1001"]
    consent.append(ic5)

    ic6 = [patienID, "Update", "HR1001"]
    consent.append(ic6)
    ic7 = ["PR1002", "Update", "HR1001"]
    consent.append(ic7)

    for sublist in consent:
        # Unpack each sublist into variables and print them
        subject, action, object = sublist
        print(f"Subject: {subject}, Action: {action}, Object: {object}")

        contract_factory_contract_address.addInformedConsent(
            patienID, subject, action, object, {"from": account}
        )


def get_all_informed_consent():
    account = get_account()
    contract_factory_contract_address = InformedConsentFactoryContract[-1]


def main():
    # informed_consent_conttract_factory_deployment()
    # read_all_patient_consent_contract()
    add_informed_consent()
    # get_all_informed_consent()


# Patient ID: PT1001
# Contract Address: 0xf97A64dF6B4f61780b542986d627998e1Dfbe666

# Patient ID: PT1002
# Contract Address: 0xc5BD6b0E472F7353E58bb87c488E7d2Df320A0d5

# Patient ID: PT1003
# Contract Address: 0x6928f9f9322dAfbA9f774531153f9D80f5BaDE51

# Patient ID: PT1004
# Contract Address: 0x0022825Ad907198E4f74f77648cDe788C74f7143

# Patient ID: PT1005
# Contract Address: 0xbaA01D170743fb57652FBa75537F852b594F6541

# Patient ID: PT1006
# Contract Address: 0x8328DF22E68087A2F879D2Df9590C6e5fF0acF7c

# Patient ID: PT1007
# Contract Address: 0x9C6678e08A0E65A62257E6fE626a644a37Df69cd

# Patient ID: PT1008
# Contract Address: 0xb9def2f66Ccc938ccd547F9645c6f013eFC22a02

# Patient ID: PT1009
# Contract Address: 0x49Cf072397bd4e0adff567CAEf9f05296CaD255A

# Patient ID: PT1010
# Contract Address: 0xE50Ce0f60531e9B25F1895a4ca2f00F3c8E26133
