import React from 'react';
import "./BarraLateral.css"

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
                    <a href="#" className = "nav-link text-white activa enlace-lateral">
                        <i className = "bi bi-house-door me-2"></i>
                        Inicio
                    </a>
                </li>

                <li className = "nav-item">
                    <a href="#" className = "nav-link text-white enlace-lateral">
                        <i className = "bi bi-box-seam me-2"></i>
                        Productos
                    </a>
                </li>

                <li className = "nav-item">
                    <a href="#" className = "nav-link text-white enlace-lateral">
                        <i className = "bi bi-clipboard-data me-2"></i>
                        Inventario / Movimientos
                    </a>
                </li>

                <li className = "nav-item">
                    <a href="#" className = "nav-link text-white enlace-lateral">
                        <i className = "bi bi-truck me-2"></i>
                        Proveedores
                    </a>
                </li>

                <li className = "nav-item mt-auto">
                    <a href="#" className = "nav-link text-white enlace-lateral">
                        <i className = "bi  bi-box-arrow-right me-2"></i>
                        Salir
                    </a>
                </li>

            </ul>
        </div>
    );
}

export default BarraLateral;