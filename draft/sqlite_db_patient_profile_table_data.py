import sqlite3
from sqlite3 import Error
import hashlib
from faker import Faker


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


def create_table(conn, create_table_sql):
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
        print(create_table_sql + "database is created")
    except Error as e:
        print(e)


def insert_data(conn, task):
    sql = """ INSERT INTO profile(id,name,email,country,hash)
              VALUES(?,?,?,?,?) """
    cur = conn.cursor()
    cur.execute(sql, task)
    conn.commit()
    return cur.lastrowid


def main():
    database = r"BlockchainHealthcare.db"

    sql_create_profile_table = """ CREATE TABLE IF NOT EXISTS profile (
                                        id integer PRIMARY KEY,
                                        name text NOT NULL,
                                        email text,
                                        country text,
                                        hash text
                                    ); """

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        create_table(conn, sql_create_profile_table)
    else:
        print("Error! cannot create the database connection.")

    fake = Faker()
    patient_number = 100000

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
