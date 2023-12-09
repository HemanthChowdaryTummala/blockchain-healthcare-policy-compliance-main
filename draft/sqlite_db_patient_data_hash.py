import hashlib
import time
import sqlite3
from sqlite3 import Error


def update_hash(conn, hash_id):
    sql = """ UPDATE profile
              SET hash = ?
              WHERE id = ?"""
    cur = conn.cursor()
    cur.execute(sql, hash_id)
    conn.commit()


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def select_profile_by_id(conn, id_number):
    cur = conn.cursor()
    cur.execute("SELECT * FROM profile WHERE id=?", (id_number,))

    rows = cur.fetchall()

    for row in rows:
        data = str(row[0]) + " " + row[1] + " " + row[2] + " " + row[3]
        data_hash = hashlib.sha256(data.encode("utf-8")).hexdigest()

        update_hash(conn, (data_hash, id_number))


def main():
    database = r"BlockchainHealthcare.db"

    patient_number = 100000
    # create a database connection
    conn = create_connection(database)
    print(
        "\nStarting to update "
        + str(patient_number)
        + " Patient profile hash ..........."
    )
    start = time.time()
    with conn:
        for i in range(1, patient_number + 1):
            select_profile_by_id(conn, i)

    conn.close()
    end = time.time()
    print("Time took updating hash:  " + str(end - start))
    print(
        "Successfully updated "
        + str(patient_number)
        + " Patient profile hash ...........\n"
    )


if __name__ == "__main__":
    main()
