from sqlalchemy import text, insert, select
import pandas as pd
from sklearn import tree
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

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

def iris_csv_to_pd():
  df = pd.read_csv('./IRIS.csv')
  return df

def train_model(df):
  x = df[['sepal_length','sepal_width','petal_length','petal_width']]
  y = df['species']
  x_train,x_test,y_train,y_test=train_test_split(x,y,test_size=.3)
  classifier=tree.DecisionTreeClassifier()
  classifier.fit(x_train,y_train)
  predictions=classifier.predict(x_test)
  print(x_test)
  return accuracy_score(y_test,predictions), classifier, y.size
