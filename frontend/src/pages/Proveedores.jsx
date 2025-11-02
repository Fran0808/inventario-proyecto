import React, { useEffect, useState } from "react";
import Formulario from '../componentes/Formulario/Formulario';
import Tablas from "../componentes/Tablas/Tablas";

function Proveedores() {

    // 🔹 Estados para datos
    const [proveedores, setDatosProveedores] = useState([]);

    // 🔹 Función para obtener los productos
    const obtenerProveedores = async () => {
        const res = await fetch("http://localhost:3000/proveedores");
        const data = await res.json();
        setDatosProveedores(data);
    };

    useEffect(() => {
        obtenerProveedores();
      }, []);
    
      // 🔹 Función para manejar el envío del formulario
    const manejarEnvio = async(nuevoProveedor) => {

        const res = await fetch("http://localhost:3000/proveedores", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(nuevoProveedor)
        });

        if (res.ok) {
            alert("Proveedor registrado correctamente");
            obtenerProveedores();
        } else {
            alert("Error al registrar el proveedor")
        }
    };

    const campos = [
        {
            nombre: "razon_social",
            etiqueta: "Razón Social",
            tipo: "text",
            requerido: true
        },
        {
            nombre: "telefono", 
            etiqueta: "Telefono",
            tipo: "text",
            requerido: true
        },
        {
            nombre: "activo",
            etiqueta: "Estado activo",
            tipo: "checkbox",
            requerido: true
        }
    ];

    return(
    <div className="container mt-4">
        <h2>Proveedores</h2>
        <button
            className="btn btn-success my-3"
            data-bs-toggle="modal"
            data-bs-target="#modalFormulario"
        >
            Agregar Proveedor
        </button>

        {/* 🔹 Modal Bootstrap */}
        <div
            className="modal fade"
            id="modalFormulario"
            tabIndex="-1"
            aria-labelledby="modalFormularioLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-lg">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="modalFormularioLabel">
                    Formulario Proveedor
                </h5>
                <button
                    id="cerrarModal"
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Cerrar"
                ></button>
                </div>
                <div className="modal-body">
                <Formulario titulo="Nuevo Proveedor" campos={campos} onEnviar={manejarEnvio} />
                </div>
            </div>
            </div>
        </div>

        <h3 className="mt-5">Lista de proveedores</h3>
        <Tablas data={proveedores} />
    </div>
    );
}

export default Proveedores;