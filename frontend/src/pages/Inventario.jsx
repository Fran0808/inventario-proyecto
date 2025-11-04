import React, { useEffect, useState } from "react";
import Formulario from "../componentes/Formulario/Formulario";
import Tablas from "../componentes/Tablas/Tablas";

function Inventario() {
  // 🔹 Estados para datos
  const [inventario, setDatosInventario] = useState([]);
  const [datosProductos, setDatosProductos] = useState([]);

  // 🔹 Función para obtener los movimientos
  const obtenerInventario = async () => {
    const res = await fetch("http://localhost:3000/inventario");
    const data = await res.json();
    setDatosInventario(data);
  };

  useEffect(() => {
    obtenerInventario();
  }, []);

  // 🔹 Función para manejar el envío del formulario
  const manejarEnvio = async (nuevoMovimiento) => {
    const movimientoConUsuario = {
      ...nuevoMovimiento,
      id_usuario: 1, // Valor por defecto
    };

    const res = await fetch("http://localhost:3000/inventario", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movimientoConUsuario),
    });

    if (res.ok) {
      alert("Movimiento de inventario registrado correctamente");
      obtenerInventario();
    } else {
      alert("Error al registrar el movimiento");
    }
  };

  // 🔹 Obtener categorías del backend
  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data) => setDatosProductos(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  const campos = [
    {
      nombre: "id_producto",
      etiqueta: "Producto",
      tipo: "select",
      opciones: datosProductos,
      requerido: true,
    },
    {
      nombre: "tipo_movimiento",
      etiqueta: "Tipo de movimiento",
      tipo: "select",
      opciones: [
        { id: "ENTRADA", nombre: "Entrada" },
        { id: "SALIDA", nombre: "Salida" },
      ],
    },
    {
      nombre: "cantidad",
      etiqueta: "Cantidad",
      tipo: "number",
      requerido: true,
    },
    {
      nombre: "nota",
      etiqueta: "Nota de movimiento",
      tipo: "text",
      requerido: true,
    },
  ];

  return (
    <div className="mx-4">
      <h2>Movimiento de Inventario</h2>
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
              <Formulario
                titulo="Nuevo Movimiento"
                campos={campos}
                onEnviar={manejarEnvio}
              />
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#modalFormulario"
      >
        AGREGAR MOVIMIENTO
      </button>
      <Tablas data={inventario} />
    </div>
  );
}

export default Inventario;
