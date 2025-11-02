import React, { useEffect, useState } from "react";
import Formulario from '../componentes/Formulario/Formulario';
import Tablas from "../componentes/Tablas/Tablas";

function Inventario() {

    // 🔹 Estados para datos
    const [inventario, setDatosInventario] = useState([]);
    const [datosProductos, setDatosProductos] = useState([]);

    // 🔹 Función para obtener los productos
    const obtenerInventario = async () => {
        const res = await fetch("http://localhost:3000/inventario");
        const data = await res.json();
        setDatosInventario(data);
    };

    useEffect(() => {
        obtenerInventario();
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
            obtenerInventario();
        } else {
            alert("Error al registrar el proveedor")
        }
    };

    // 🔹 Obtener categorías del backend
      useEffect(() => {
        fetch("http://localhost:3000/productos")
          .then((response) => response.json())
          .then((data) => setDatosProductos(data))
          .catch((error) => console.error("Error al obtener categorías:", error));
      }, []);
    
        // 🔹 FALTA DE USUARIO


    const campos = [
        {
            nombre: "id_producto",
            etiqueta: "Producto",
            opciones: datosProductos,
            requerido: true
        }, {
            nombre: "id_usuario",
            etiqueta: "Usuario",
            tipo: "text",
            requerido: true
        }, {
            nombre: "tipo_movimiento",
            etiqueta: "Razón Social",
            tipo: "text",
            requerido: true
        }, {
            nombre: "fecha_movimiento",
            etiqueta: "Razón Social",
            tipo: "text",
            requerido: true
        }, {
            nombre: "cantidad",
            etiqueta: "Razón Social",
            tipo: "text",
            requerido: true
        }, {
            nombre: "nota",
            etiqueta: "Razón Social",
            tipo: "text",
            requerido: true
        }
        
    ];

    return(
    <div className="container mt-4">
        <h2>Movimiento de Inventario</h2>
        <button
            className="btn btn-success my-3"
            data-bs-toggle="modal"
            data-bs-target="#modalFormulario"
        >
            Agregar Movimiento
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
                    Formulario de Movimientos de inventario
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
                <Formulario titulo="Nuevo Movimiento" campos={campos} onEnviar={manejarEnvio} />
                </div>
            </div>
            </div>
        </div>

        <h3 className="mt-5">Lista de movimientos en el inventario</h3>
        <Tablas data={inventario} />
    </div>
    );
}

export default Inventario;