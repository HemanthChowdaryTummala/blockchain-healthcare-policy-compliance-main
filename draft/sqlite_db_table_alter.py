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


def alter_table(conn, alter_table_sql):
    """create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(alter_table_sql)
        print("profile table is altered with hash new column")
    except Error as e:
        print(e)


def main():
    database = r"BlockchainHealthcare.db"

    sql_alter_profile_table = " ALTER TABLE profile ADD COLUMN hash text;"

    # print(fake.name())
    # print(fake.email())
    # print(fake.country())

    # create a database connection
    conn = create_connection(database)

    # create tables
    if conn is not None:
        # create projects table
        alter_table(conn, sql_alter_profile_table)
    else:
        print("Error! cannot create the database connection.")


if __name__ == "__main__":
    main()
