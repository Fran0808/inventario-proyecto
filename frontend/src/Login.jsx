import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [dato, setDato] = useState({ username: "", contraseña: "" });

  useEffect(() => {
    // Si ya está logueado, redirige a /inicio
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
      alert("Ingresa usuario y contraseña");
      return;
    }

    try {
      // Envía la petición al backend
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre_usuario: dato.username,
          contraseña: dato.contraseña,
        }),
      });

      const data = await res.json();

      // Si el backend responde con error (por ejemplo 401 o 500)
      if (!res.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Si todo está bien, guarda los datos del usuario en el almacenamiento local
      localStorage.setItem("auth", JSON.stringify(data.usuario));

      alert(`Bienvenido ${data.usuario.nombre_usuario}`);

      // Redirige a /inicio
      navigate("/inicio");
    } catch (err) {
      alert(err.message);
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
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              value={dato.username}
              onChange={manejoCambio}
              className="form-control"
              placeholder="Ingresa tu usuario"
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
              placeholder="Ingresa tu contraseña"
            />
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
