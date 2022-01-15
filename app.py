from flask import Flask, request, jsonify
from database import engine, iris
from utils import insert_iris_csv, insert_record, get_records

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://{MARIADB_USER}:{MARIADB_PASSWORD}@172.25.0.13/saas'
db = SQLAlchemy(app)
ma = Marshmallow(app)

class Iris(db.Model):
    __tablename__ = 'iris'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    sepal_length = db.Column(db.Float)
    sepal_width = db.Column(db.Float)
    petal_length = db.Column(db.Float)
    petal_width = db.Column(db.Float)
    species = db.Column(db.String(30))


class IrisSchema(ma.Schema):
    class Meta:
        fields = ('id', 'sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'species')


@app.route('/', methods=['POST', 'GET'])
def insert_flower():
    if request.method == 'POST':
        new_flower = request.json
        insert_record(engine, new_flower, iris)
        return jsonify({'message': 'Flower added!'})

    with engine.connect() as conn:
        rows = get_records(engine,iris)
        return jsonify({'message': rows})

@app.route('/iris-data', methods=['POST'])
def insert_iris_data():
    insert_iris_csv(engine)
    return {"message": "Iris data inserted correctly"}

if __name__ == '__main__':
    app.run(debug=True, port=5000)
