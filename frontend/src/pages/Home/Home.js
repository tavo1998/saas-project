import React, { Component } from "react";
import "./Home.css";
import {
  TrainModel,
  GetModelInfo,
  Predict,
} from "../../services/Api-connection";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      sepalLength: "",
      sepalWidth: "",
      petalLength: "",
      petalWidth: "",
      message: "",
      trained: false,
    };
  }

  componentDidMount() {
    this.modelExists();
  }

  async modelExists() {
    const ModelInfo = await GetModelInfo();
    if (!ModelInfo) {
      this.setState({
        ...this.state,
        trained: false,
      });
    } else {
      this.setState({
        ...this.state,
        trained: true,
      });
    }
  }

  async predict() {
    const { Prediction } = await Predict({
      sepal_length: Number(this.state.sepalLength),
      sepal_width: Number(this.state.sepalWidth),
      petal_length: Number(this.state.petalLength),
      petal_width: Number(this.state.petalWidth),
    });
    this.setState({
      ...this.state,
      message: "Se predice que la flor es: " + Prediction,
    });
  }

  async trainModel() {
    const trainedModel1 = await TrainModel();
    const trainedModel2 = await TrainModel();
    if (trainedModel1 && trainedModel2) {
      this.setState({
        ...this.state,
        trained: true,
      });
    }
  }

  async getModelInfo() {
    const {message} = await GetModelInfo();

    this.setState({
      ...this.state,
      message:
        "Presición del modelo: " +
        message.accuracy +
        "%, tamaño del dataset con el que se entrenó: " +
        message.dataset_size +
        ", última fecha de entrenamiento: " +
        message.date,
    });
  }

  render() {
    return (
      <div className="background">
        <div className="card">
          <div className="header">
            <h2 className="tittle">Iris</h2>
          </div>
          <div className="form">
            <div className="info-container">
              <label className="info-label">
                Ingrese la información de la flor para predecir su categoria
              </label>
            </div>
            <div className="row-container">
              <div className="content">
                <label className="header">Largo del sépalo</label>
                <input
                  placeholder="Largo del sépalo"
                  className="input"
                  required="required"
                  type="number"
                  value={this.state.sepalLength}
                  onChange={(e) =>
                    this.setState({ sepalLength: e.target.value })
                  }
                />
                <p className="required">Este campo es requerido.</p>
              </div>
              <div className="content">
                <label className="header">Ancho del sépalo</label>
                <input
                  placeholder="Ancho del sépalo"
                  className="input"
                  required="required"
                  type="number"
                  value={this.state.sepalWidth}
                  onChange={(e) =>
                    this.setState({ sepalWidth: e.target.value })
                  }
                />
                <p className="required">Este campo es requerido.</p>
              </div>
            </div>
            <div className="row-container">
              <div className="content">
                <label className="header">Largo del pétalo</label>
                <input
                  placeholder="Largo del pétalo"
                  className="input"
                  type="number"
                  value={this.state.petalLength}
                  onChange={(e) =>
                    this.setState({ petalLength: e.target.value })
                  }
                />
                <p className="required">Este campo es requerido.</p>
              </div>
              <div className="content">
                <label className="header">Ancho del pétalo</label>
                <input
                  placeholder="Ancho del pétalo"
                  className="input"
                  type="number"
                  value={this.state.petalWidth}
                  onChange={(e) =>
                    this.setState({ petalWidth: e.target.value })
                  }
                />
                <p className="required">Este campo es requerido.</p>
              </div>
            </div>
            <div className="result">
              <label>{this.state.message}</label>
            </div>
            <footer>
              <button
                className="predict-button"
                onClick={this.trainModel.bind(this)}
              >
                Entrenar modelo
              </button>
              {this.state.trained && (
                <>
                  <button
                    className="predict-button"
                    onClick={this.getModelInfo.bind(this)}
                  >
                    Obtener información del modelo
                  </button>
                  <button
                    className="predict-button"
                    onClick={this.predict.bind(this)}
                  >
                    Predecir
                  </button>
                </>
              )}
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
