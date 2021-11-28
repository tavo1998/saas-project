from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class Iris(db.Model):
    __tablename__ = 'iris'
    id = db.Column(db.Integer, primary_key=True)
    sepal_length = db.Column(db.Float)
    sepal_width = db.Column(db.Float)
    petal_length = db.Column(db.Float)
    petal_width = db.Column(db.Float)
    species = db.Column(db.String)


@app.route('/', methods=['POST', 'GET'])
def insert_flower():
    if request.method == 'POST':
        new_flower = Iris(**request.json)
        db.session.add(new_flower)
        db.session.commit()
        return jsonify({'message': 'Flower added!'})

    flowers = Iris.query.all()
    return jsonify([e.serialize() for e in flowers])

if __name__ == '__main__':
    app.run(debug=True, port=5000)