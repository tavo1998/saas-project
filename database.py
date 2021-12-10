import sys
import pymysql

def load_to_database(cursor, file_path):
  cursor.execute("USE saas")
  cursor.execute("""LOAD DATA LOCAL INFILE '{}'
                INTO TABLE iris
                FIELDS TERMINATED BY ','
                LINES TERMINATED BY '\r\n'
                IGNORE 1 LINES
                (sepal_length, sepal_width, petal_length, petal_width, species)
                """.format(file_path))

def main():
  try:
    host = sys.argv[1]
    user = sys.argv[2]
    password = sys.argv[3]
    file_path = sys.argv[4]
  except IndexError:
    print("Something was wrong, verify parameters (host user password file_path)")
    return

  try:
    conn = pymysql.connect(host=host, user=user, password=password, local_infile=True)
    cur = conn.cursor()
    load_to_database(cur, file_path)
  except:
    print("An error occurred with the database")
  finally:
    conn.commit()
    cur.close()
    conn.close()

main()