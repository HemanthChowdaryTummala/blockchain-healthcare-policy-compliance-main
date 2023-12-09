import sqlite3

# Create or connect to the database file
conn = sqlite3.connect('TreatmentTeamSample.db')

# Create a cursor object to execute SQL commands
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS contracts (
        patient TEXT,
        contract TEXT
    )
''')
# Data to be inserted into the table
data = [
    ("PT1001", "0x24ABab6CD797b802bdC8D50a78Feb7f91917F963"),
    ("PT1002", "0x748eaB545E4e67e69092C38f872b29c637b841F8"),
    ("PT1003", "0x4648E2b036c9C79bE8CbCa99367147098d2a1dd8"),
    ("PT1004", "0xc99D16cddf44502a4F1959325d6aBB9AD5fCbC90"),
    ("PT1005", "0x2f7E3D85711F4cA5746869677Bc217c4fbb7203f"),
    ("PT1006", "0xb53F3bEB8FCc0C002A91dE0FDFa093751292e2E1"),
    ("PT1007", "0x771d7f59b5e80917b373FF22f359993ee7a4dC2C"),
    ("PT1008", "0xC615bC700Ef4140B2e03e0f45A20C99Ff0C5cB88"),
    ("PT1009", "0xBC26031E675EAbf7A2f3394b8E1ec7d83016D4E4"),
    ("PT1010", "0xF61161B83974CA7a362ca367B6779D565981810B"),
]

# Insert data into the "contracts" table
cursor.executemany('INSERT INTO contracts (patient, contract) VALUES (?, ?)', data)

# Commit the changes and close the database connection
conn.commit()
conn.close()
