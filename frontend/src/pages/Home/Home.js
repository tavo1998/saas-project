import React, { Component } from "react";
import "./Home.css";

export default class Home extends Component {
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
                />
                <p className="required">
                  Este campo es requerido.
                </p>
              </div>
              <div className="content">
                <label className="header">Ancho del sépalo</label>
                <input
                  placeholder="Ancho del sépalo"
                  className="input"
                  required="required"
                  type="number"
                />
                <p className="required">
                  Este campo es requerido.
                </p>
              </div>
            </div>
            <div className="row-container">
              <div className="content">
                <label className="header">Largo del pétalo</label>
                <input
                  placeholder="Largo del pétalo"
                  className="input"
                  type="number"
                />
                <p className="required">
                  Este campo es requerido.
                </p>
              </div>
              <div className="content">
                <label className="header">Ancho del pétalo</label>
                <input
                  placeholder="Ancho del pétalo"
                  className="input"
                  type="number"
                />
                <p className="required">
                  Este campo es requerido.
                </p>
              </div>
            </div>
            <footer>
              <button className="predict-button">Predecir</button>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}
