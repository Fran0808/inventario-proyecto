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
    <div className="barra-lateral p-3 vh-100">
      <div className="d-flex align-items-center justify-content-center mb-4 pt-4">
        <img src="/Logo.png" alt="Logo" style={{ width: "200px" }} />
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink
            to="/inicio"
            className={({ isActive }) =>
              `nav-link enlace-lateral ${isActive ? "activa" : ""}`
            }
          >
            <span className="d-flex align-items-center fs-5">
              <i className="bi bi-house-door  me-2"></i>Inicio
            </span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              `nav-link enlace-lateral ${isActive ? "activa" : ""}`
            }
          >
            <span className="d-flex align-items-center fs-5">
              <i className="bi bi-box-seam me-2"></i>Productos
            </span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/inventario"
            className={({ isActive }) =>
              `nav-link enlace-lateral  ${isActive ? "activa" : ""}`
            }
          >
            <span className="d-flex align-items-center fs-5">
              <i className="bi bi-clipboard-data me-2"></i>
              Movimientos
            </span>
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink
            to="/proveedores"
            className={({ isActive }) =>
              `nav-link enlace-lateral  ${isActive ? "activa" : ""}`
            }
          >
            <span className="d-flex align-items-center fs-5">
              <i className="bi bi-truck  me-2"></i>Proveedores
            </span>
          </NavLink>
        </li>

        <li className="nav-item mt-auto">
          <button
            onClick={logout}
            className="nav-link enlace-lateral  border-0 w-100 text-start"
          >
            <span className="d-flex align-items-center fs-5">
              <i className="bi bi-box-arrow-right fs-4 me-2"></i>Salir
            </span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default BarraLateral;
