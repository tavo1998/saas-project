import React, { Component } from "react";
import "./Home.css";
import { TrainModel } from "../../services/Api-connection";

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      sepalLength: '',
      sepalWidth: '',
      petalLength: '',
      petalWidth: '',
      prediction: ''
    };
  }

  async predict() {
    console.log(await TrainModel());
      console.log(this.state);
  }

  render() {
    return (
      <div className="background">
        <div className="card">
          <div className="header">
            <h2 className="tittle">Irisaaa</h2>
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
                  onChange={(e) => this.setState({ sepalLength: e.target.value })}
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
                  onChange={(e) => this.setState({ sepalWidth: e.target.value })}
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
                  onChange={(e) => this.setState({ petalLength: e.target.value })}
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
                  onChange={(e) => this.setState({ petalWidth: e.target.value })}
                />
                <p className="required">Este campo es requerido.</p>
              </div>
            </div>
            <div className="result">
                Se predice que la flor es: <label>{this.state.prediction}</label>
            </div>
            <footer>
              <button className="predict-button" onClick={this.predict.bind(this)}>Predecir</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
