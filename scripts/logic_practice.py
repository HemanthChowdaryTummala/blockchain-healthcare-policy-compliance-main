def main():
    # "PT1002"
    consent = []
    ic1 = ["PT1002", "Read", "HR1001"]
    consent.append(ic1)
    ic2 = ["PR1002", "Read", "HR1001"]
    consent.append(ic2)
    ic3 = ["PR1002", "Read", "HR1001"]
    consent.append(ic3)

    ic4 = ["PT1002", "Write", "HR1001"]
    consent.append(ic4)
    ic5 = ["PR1002", "Write", "HR1001"]
    consent.append(ic5)

    ic6 = ["PT1002", "Update", "HR1001"]
    consent.append(ic6)
    ic7 = ["PR1002", "Update", "HR1001"]
    consent.append(ic7)

    # Print each sublist in "consent"
    for sublist in consent:
        # Unpack each sublist into variables and print them
        subject, action, object = sublist
        print(f"Subject: {subject}, Action: {action}, Object: {object}")


# Call the main function
if __name__ == "__main__":
    main()
