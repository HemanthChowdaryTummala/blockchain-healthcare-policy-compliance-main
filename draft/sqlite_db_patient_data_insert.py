import hashlib
import sqlite3
from sqlite3 import Error

from faker import Faker


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def insert_data(conn, task):
    sql = """ INSERT INTO profile(id,name,email,country,hash)
              VALUES(?,?,?,?,?) """
    cur = conn.cursor()
    cur.execute(sql, task)
    conn.commit()
    return cur.lastrowid


def main():
    database = r"BlockchainHealthcare.db"
    fake = Faker()
    patient_number = 100000
    # create a database connection
    conn = create_connection(database)

    print(
        "Starting creation of Patient profile for "
        + str(patient_number)
        + " patients..........."
    )

    with conn:
        # patient data
        for x in range(1, patient_number + 1):
            patient_id = x
            patient_name = fake.name()
            patient_email = fake.email()
            patient_country = fake.country()
            patient_data = (
                str(patient_id)
                + " "
                + patient_name
                + " "
                + patient_email
                + " "
                + patient_country
            )
            patient_data_hash = hashlib.sha256(patient_data.encode("utf-8")).hexdigest()

            data = (
                patient_id,
                patient_name,
                patient_email,
                patient_country,
                patient_data_hash,
            )

            insert_data(conn, data)

    conn.close()
    print(
        "Successfully "
        + str(patient_number)
        + " Patient profile are created..........."
    )


if __name__ == "__main__":
    main()
