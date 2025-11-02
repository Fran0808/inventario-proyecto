import React from 'react';
import "./BarraLateral.css"
import { NavLink, Link } from "react-router-dom";

function BarraLateral() {
    return(
        <div className = "barra-lateral text-white p-3 vh-100">
            <div className="d-flex align-items-center mb-4">
                <i className = "bi bi-shop me-2 fs-4"></i>
                <span className = "fs-5 fw-semibold">NOMBRE TIENDA</span>
            </div>

            <hr className = "border-light opacity-50"/>

            <ul className = "nav flex-column">
                <li className = "nav-item">
                    <NavLink to="/"  className={({ isActive }) => `nav-link text-white enlace-lateral ${isActive ? "activa" : ""}`}>
                        <i className="bi bi-house-door me-2"></i>Inicio
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to="/productos" className={({ isActive }) => `nav-link text-white enlace-lateral ${isActive ? "activa" : ""}`}>
                        <i className="bi bi-box-seam me-2"></i>Productos
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to="/inventario" className={({ isActive }) => `nav-link text-white enlace-lateral ${isActive ? "activa" : ""}`}>
                        <i className="bi bi-clipboard-data me-2"></i>Inventario / Movimientos
                    </NavLink>
                </li>

                <li className = "nav-item">
                    <NavLink to="/proveedores" className={({ isActive }) => `nav-link text-white enlace-lateral ${isActive ? "activa" : ""}`}>
                        <i className="bi bi-truck me-2"></i>Proveedores
                    </NavLink>
                </li>

                <li className = "nav-item mt-auto">
                    <Link to="/login" className="nav-link text-white enlace-lateral">
                        <i className="bi bi-box-arrow-right me-2"></i>Salir
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default BarraLateral;