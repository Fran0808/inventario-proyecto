import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [dato, setDato] = useState({ username: "", contraseña: "" });

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      navigate("/inicio");
    }
  }, []);

  const manejoCambio = (e) => {
    setDato({
      ...dato,
      [e.target.id]: e.target.value,
    });
  };

  const verificarLogin = async (e) => {
    e.preventDefault();

    // Verifica que los campos no estén vacíos
    if (!dato.username || !dato.contraseña) {
      Swal.fire({
        icon: "warning",
        title: "Campos vacíos",
        text: "Ingresa usuario y contraseña",
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: dato.username,
          contraseña: dato.contraseña,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guarda los datos del usuario
      localStorage.setItem("auth", JSON.stringify(data.usuario));

      // Muestra mensaje de éxito
      await Swal.fire({
        icon: "success",
        title: `Bienvenido ${data.usuario.nombre_usuario}`,
        showConfirmButton: false,
        timer: 1500,
      });

      // Redirige al inicio
      navigate("/inicio");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow">
        <div className="login-header">
          <img src="/Logo.png" alt="Logo" style={{ width: "250px" }} />
          <p className="login-subtitle">Sistema de Gestión de Inventario</p>
        </div>

        <form onSubmit={verificarLogin}>
          <div className="form-group mb-3">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={dato.username}
              onChange={manejoCambio}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              value={dato.contraseña}
              onChange={manejoCambio}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
