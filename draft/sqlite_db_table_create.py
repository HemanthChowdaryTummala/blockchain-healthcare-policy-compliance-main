import sqlite3
from sqlite3 import Error


def create_connection(db_file):
    conn = None
    try:
        conn = sqlite3.connect(db_file)
        return conn
    except Error as e:
        print(e)

    return conn


def create_table(conn, create_table_sql):
    """create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
        print(create_table_sql + "database is created")
    except Error as e:
        print(e)


def main():
    database = r"BlockchainHealthcare.db"

    sql_create_profile_table = """ CREATE TABLE IF NOT EXISTS patient_profile (
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


if __name__ == "__main__":
    main()
