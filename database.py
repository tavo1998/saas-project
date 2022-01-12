import os
from sqlalchemy import create_engine, MetaData, Table, Column
from sqlalchemy.sql.sqltypes import Float, Integer, String

MARIADB_USER = os.environ.get("MARIADB_USER")
MARIADB_PASSWORD = os.environ.get("MARIADB_PASSWORD")

engine = create_engine(
  f'mariadb+pymysql://{MARIADB_USER}:{MARIADB_PASSWORD}@master/saas',
  connect_args={'local_infile': True}, 
  echo=True
)
metadata = MetaData()

iris = Table("iris", metadata,
              Column('id', Integer, primary_key=True),
              Column('sepal_length', Float, nullable=False),
              Column('sepal_width', Float, nullable=False),
              Column('petal_length', Float, nullable=False),
              Column('petal_width', Float, nullable=False),
              Column('species', String(30), nullable=False))

metadata.create_all(engine)