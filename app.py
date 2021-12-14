import os
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

MARIADB_USER = os.environ.get("MARIADB_USER")
MARIADB_PASSWORD = os.environ.get("MARIADB_PASSWORD")

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
        new_flower = Iris(**request.json)
        db.session.add(new_flower)
        db.session.commit()
        return jsonify({'message': 'Flower added!'})

    flowers = Iris.query.all()
    flowersSchema = IrisSchema(many=True)
    return jsonify({'message': flowersSchema.dump(flowers)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
