from sqlalchemy import text, insert, select

def insert_iris_csv(engine):
  insert_stmt = text("""LOAD DATA LOCAL INFILE '{}'
                        INTO TABLE iris
                        FIELDS TERMINATED BY ','
                        LINES TERMINATED BY '\r\n'
                        IGNORE 1 LINES
                        (sepal_length, sepal_width, petal_length, petal_width, species)
                      """.format('./IRIS.csv'))
  with engine.connect() as conn:
    conn.execute(insert_stmt)

def insert_record(engine, data: dict, table):
  create_stmt = insert(table).values(**data)
  with engine.connect() as conn:
    conn.execute(create_stmt)

def get_records(engine, table):
  get_stmt = select(table)
  with engine.connect() as conn:
    result = conn.execute(get_stmt)
    return [dict(row) for row in result]
