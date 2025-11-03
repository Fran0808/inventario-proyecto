import React from "react";
import "./BarraLateral.css";
import { NavLink, useNavigate } from "react-router-dom";

function BarraLateral() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div className="barra-lateral text-white p-3 vh-100">
      <div className="d-flex align-items-center mb-4"></div>

      <hr className="border-light opacity-50" />

      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/inicio"
            className={({ isActive }) =>
              `nav-link enlace-lateral text-white ${isActive ? "activa" : ""}`
            }
          >
            <i className="bi bi-house-door me-2"></i>Inicio
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `nav-link enlace-lateral text-white ${isActive ? "activa" : ""}`
            }
          >
            <i className="bi bi-box-seam me-2"></i>Productos
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/inventario"
            className={({ isActive }) =>
              `nav-link enlace-lateral text-white ${isActive ? "activa" : ""}`
            }
          >
            <i className="bi bi-clipboard-data me-2"></i>Inventario /
            Movimientos
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/proveedores"
            className={({ isActive }) =>
              `nav-link enlace-lateral text-white ${isActive ? "activa" : ""}`
            }
          >
            <i className="bi bi-truck me-2"></i>Proveedores
          </NavLink>
        </li>

        <li className="nav-item mt-auto">
          <button
            onClick={logout}
            className="nav-link enlace-lateral text-white bg-transparent border-0 w-100 text-start"
          >
            <i className="bi bi-box-arrow-right me-2"></i>Salir
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BarraLateral;
