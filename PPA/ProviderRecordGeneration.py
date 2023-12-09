import sqlite3
from faker import Faker

# Initialize Faker
fake = Faker()

# Create an SQLite database
conn = sqlite3.connect('Provider.db')
cursor = conn.cursor()

# Create a provider table with "patient_id" as the first column
cursor.execute('''CREATE TABLE IF NOT EXISTS Provider (
    provider_id TEXT PRIMARY KEY,
    title TEXT,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    qualification TEXT,
    speciality TEXT,
    phone_number TEXT,
    email_address TEXT,
    house_number TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    emergency_contact_first_name TEXT,
    emergency_contact_last_name TEXT,
    emergency_contact_phone_number TEXT,
    emergency_contact_relationship TEXT,
    emergency_contact_home_street TEXT,
    emergency_contact_home_city TEXT,
    emergency_contact_home_state TEXT,
    emergency_contact_home_zip TEXT
)''')

# Generate and insert fake data into the database
for _ in range(100):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Provider VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       'Doctor',
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_element(elements=('M.D','Ph.D','Psy.D','D.O','D.D.S','D.S.W','Ed.D')),
                       fake.random_element(elements=('General Practice','Clinical Social Worker','Chiropractic','Nurse Practitioner','Optometry','Pediatric Medicine')),
                       fake.unique.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.first_name(),
                       fake.last_name(),
                       fake.unique.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))
for _ in range(500):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Provider VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       'Nurse',
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_element(elements=('ASN','BSN','NCLEX')),
                       fake.random_element(elements=('General Practice','Clinical Social Worker','Chiropractic','Nurse Practitioner','Optometry','Pediatric Medicine')),
                       fake.unique.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.first_name(),
                       fake.last_name(),
                       fake.unique.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))
for _ in range(500):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Provider VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       'Support Staff',
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_element(elements=('BS,MS')),
                       fake.random_element(elements=('General Practice','Clinical Social Worker','Chiropractic','Nurse Practitioner','Optometry','Pediatric Medicine')),
                       fake.unique.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.first_name(),
                       fake.last_name(),
                       fake.unique.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))
for _ in range(100):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Provider VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       'Lab Technician',
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_element(elements=('GES,BS')),
                       fake.random_element(elements=('General Practice','Clinical Social Worker','Chiropractic','Nurse Practitioner','Optometry','Pediatric Medicine')),
                       fake.unique.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.first_name(),
                       fake.last_name(),
                       fake.unique.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))
for _ in range(100):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Provider VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       'Billing Officer',
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_element(elements=('GES in Accounts,BS in Business')),
                       fake.random_element(elements=('General Practice','Clinical Social Worker','Chiropractic','Nurse Practitioner','Optometry','Pediatric Medicine')),
                       fake.unique.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.first_name(),
                       fake.last_name(),
                       fake.unique.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))

# Commit changes and close the database connection
conn.commit()
conn.close()

print("Data has been generated and stored in 'provider.db'")