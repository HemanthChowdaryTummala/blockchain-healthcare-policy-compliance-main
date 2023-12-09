import sqlite3
from faker import Faker

# Initialize Faker
fake = Faker()

# Create an SQLite database
conn = sqlite3.connect('Patient.db')
cursor = conn.cursor()

# Create a Patients table with "patient_id" as the first column
cursor.execute('''CREATE TABLE IF NOT EXISTS Patients (
    patient_id TEXT PRIMARY KEY,
    first_name TEXT,
    last_name TEXT,
    date_of_birth DATE,
    gender TEXT,
    phone_number TEXT,
    email_address TEXT,
    house_number TEXT,
    street TEXT,
    city TEXT,
    state TEXT,
    zip_code TEXT,
    pharmacy_name TEXT,
    pharmacy_street TEXT,
    pharmacy_city TEXT,
    pharmacy_state TEXT,
    pharmacy_zip_code TEXT,
    bank_account_name TEXT,
    bank_account_number TEXT,
    bank_routing_number TEXT,
    bank_branch_name TEXT,
    bank_name TEXT,
    insurance_id TEXT,
    insurance_company TEXT,
    insurance_policy_number TEXT,
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
for _ in range(100000):  # You can adjust the number of records as needed
    cursor.execute('''INSERT INTO Patients VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                   (
                       fake.unique.random_number(digits=6),
                       fake.first_name(),
                       fake.last_name(),
                       fake.date_of_birth(),
                       fake.random_element(elements=('Male', 'Female')),
                       fake.random_number(digits=10),
                       fake.email(),
                       fake.building_number(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.company(),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode(),
                       fake.name(),
                       fake.random_number(digits=10),
                       fake.random_number(digits=9),
                       fake.company_suffix(),
                       fake.company(),
                       fake.random_number(digits=8),
                       fake.company(),
                       fake.random_number(digits=9),
                       fake.first_name(),
                       fake.last_name(),
                       fake.random_number(digits=10),
                       fake.random_element(elements=('Spouse', 'Parent', 'Sibling', 'Friend')),
                       fake.street_name(),
                       fake.city(),
                       fake.state_abbr(),
                       fake.zipcode()
                   ))

# Commit changes and close the database connection
conn.commit()
conn.close()

print("Data has been generated and stored in 'Patients.db'")