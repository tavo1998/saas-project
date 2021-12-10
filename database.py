import sys
import pymysql

host = sys.argv[1]
user = sys.argv[2]
password = sys.argv[3]
file_path = sys.argv[4]


def load_to_database(cursor):
  cursor.execute("USE saas")
  cursor.execute("""LOAD DATA LOCAL INFILE '{}'
                INTO TABLE iris
                FIELDS TERMINATED BY ','
                LINES TERMINATED BY '\r\n'
                IGNORE 1 LINES
                (sepal_length, sepal_width, petal_length, petal_width, species)
                """.format(file_path))

def main():
  if len(sys.argv) > 1 and sys.argv[1] == "help":
    print("the parameters are: host user password file_path")
    return
  try:
    conn = pymysql.connect(host=host, user=user, password=password, local_infile=True)
    cur = conn.cursor()
    load_to_database(cur)
  except:
    print("Ocurrió un error, verifica los parametros (python3 database.py help)")
  finally:
    conn.commit()
    cur.close()
    conn.close()

main()