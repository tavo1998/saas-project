from flask import Flask, request, jsonify
from database import engine, iris
from utils import insert_iris_csv, insert_record, get_records

app = Flask(__name__)


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