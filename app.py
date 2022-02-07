import pickle
from flask import Flask, request, jsonify
from database import engine, iris
from utils import insert_iris_csv, insert_record, get_records, iris_csv_to_pd, train_model
import pandas as pd
import numpy as np
import json
from flask_cors import CORS
from datetime import date

app = Flask(__name__)
CORS(app)

def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})

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

@app.route('/train-model', methods=['GET'])
def get_training():
    df = iris_csv_to_pd()
    accuracy, trained_model, dataset_size = train_model(df)
    filename = 'trained_model.sav'
    pickle.dump(trained_model, open(filename, 'wb'))
    f = open("dataset_info.txt", "w")
    f.write("{},{},{}".format(dataset_size, accuracy, date.today()))
    f.close()
    return {'message': 'Modelo entrenado con una precisión de: {}'.format(accuracy*100)}

@app.route('/model-info', methods=['GET'])
def get_model_info():
    try:
        f = open("dataset_info.txt", "r")
        info = f.read().split(",")
        return json_response({'message': {
            'dataset_size': info[0],
            'accuracy': float(info[1])*100,
            'date': info[2]
        }}, 200)
    except:
        return json_response({'message': 'No hay información del modelo'}, 500)

@app.route('/predict', methods=['POST'])
def predict():
    filename = 'trained_model.sav'
    loaded_model = pickle.load(open(filename, 'rb'))
    data = pd.json_normalize(request.get_json()) 
    prediction = loaded_model.predict(data)
    return {"Prediction": json.dumps(np.ndarray.tolist(prediction)).replace("[", "").replace("\"", "").replace("]", "")}

if __name__ == '__main__':
    app.run(debug=True, use_debugger=True, use_reloader=True, port=5000)
