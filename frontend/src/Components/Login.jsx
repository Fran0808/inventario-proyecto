import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

const Login = () => {
  const navegador = useNavigate();
  const [dato, setDato] = useState({ username: "", contraseña: "" });

  const manejoCambio = (e) => {
    setDato({
      ...dato,
      [e.target.id]: e.target.value,
    });
  };

  const verificarLogin = (e) => {
    e.preventDefault();
    if (dato.username && dato.contraseña) {
      navegador("/Inicio");//para ir al inicio
    } else {
      alert("Por favor, ingresa tu usuario y contraseña.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow">
        <div className="login-header">
          <div className="login-logo">Store Inventory</div>
          <p className="login-subtitle">Sistema de Gestión de Inventario</p>
        </div>

        <form onSubmit={verificarLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Ingresa tu usuario"
              value={dato.username}
              onChange={manejoCambio}
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              type="password"
              id="contraseña"
              className="form-control"
              placeholder="Ingresa tu contraseña"
              value={dato.password}
              onChange={manejoCambio}
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary w-full">
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
