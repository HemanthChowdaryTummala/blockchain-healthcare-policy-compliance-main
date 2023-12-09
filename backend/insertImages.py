import sqlite3
import os

db_connection = sqlite3.connect("TreatmentTeamSample.db")
cursor = db_connection.cursor()

# Create the "Image" table with ID (image name) as text and image data as BLOB
# cursor.execute('''
#     CREATE TABLE IF NOT EXISTS Image (
#         id TEXT PRIMARY KEY,
#         image_data BLOB
#     )
# ''')
db_connection.commit()

image_directory = "images"
if os.path.exists(image_directory):
    for filename in os.listdir(image_directory):
        if filename.endswith((".jpg", ".png")):  
            image_file_path = os.path.join(image_directory, filename)
            if os.path.exists(image_file_path):
                with open(image_file_path, "rb") as image_file:
                    image_data = image_file.read()
                image_name = os.path.splitext(filename)[0]
                cursor.execute("INSERT INTO Image (id, image_data) VALUES (?, ?)", (image_name, image_data))
                db_connection.commit()
                print(f"Image '{image_name}' inserted into the database.")
            else:
                print(f"Image file '{filename}' does not exist.")
else:
    print("Image directory does not exist.")

db_connection.close()