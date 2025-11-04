import React, { useEffect, useState } from "react";
import Formulario from "../componentes/Formulario/Formulario";
import Tablas from "../componentes/Tablas/Tablas";
import "./Style.css";
function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

  const obtenerProveedores = async () => {
    const res = await fetch("http://localhost:3000/proveedores");
    const data = await res.json();
    setProveedores(data);
  };

  useEffect(() => {
    obtenerProveedores();
  }, []);

  // Crear proveedor
  const manejarEnvio = async (nuevoProveedor) => {
    const res = await fetch("http://localhost:3000/proveedores", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProveedor),
    });

    if (res.ok) {
      alert("Proveedor registrado correctamente");
      obtenerProveedores();
      document.getElementById("cerrarModalAgregar").click();
    } else {
      alert("Error al registrar el proveedor");
    }
  };

  const manejarActualizacion = async (proveedorActualizado) => {
    if (!proveedorSeleccionado) return;

    const { id_proveedor, activo, ...resto } = proveedorActualizado;

    const body = {
      ...resto,
      activo: Boolean(activo),
    };

    const res = await fetch(
      `http://localhost:3000/proveedores/${proveedorSeleccionado.id_proveedor}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (res.ok) {
      alert("Proveedor actualizado correctamente");
      obtenerProveedores();
      document.getElementById("cerrarModalEditar").click();
    } else {
      const errorData = await res.json();
      alert("Error al actualizar el proveedor: " + errorData.error);
    }
  };

  // Eliminar proveedor
  const eliminarProveedor = async (proveedor) => {
    if (!window.confirm("¿Eliminar proveedor?")) return;
    const res = await fetch(
      `http://localhost:3000/proveedores/${proveedor.id_proveedor}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      alert("Proveedor eliminado");
      obtenerProveedores();
    }
  };

  // Editar proveedor
  const editarProveedor = (proveedor) => {
    setProveedorSeleccionado(proveedor);
    const modalEditar = new bootstrap.Modal(
      document.getElementById("modalEditarProveedor")
    );
    modalEditar.show();
  };

  const campos = [
    {
      nombre: "razon_social",
      etiqueta: "Razón Social",
      tipo: "text",
      requerido: true,
    },
    { nombre: "telefono", etiqueta: "Teléfono", tipo: "text", requerido: true },
    {
      nombre: "activo",
      etiqueta: "Activo",
      tipo: "checkbox",
      requerido: false,
    },
  ];

  return (
    <div className="mx-4">
      <h1>CONTACTOS DE SUMINISTRO</h1>

      {/* Modal Agregar */}
      <div
        className="modal fade"
        id="modalAgregarProveedor"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Nuevo Proveedor</h5>
              <button
                id="cerrarModalAgregar"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <Formulario campos={campos} onEnviar={manejarEnvio} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar */}
      <div
        className="modal fade"
        id="modalEditarProveedor"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Proveedor</h5>
              <button
                id="cerrarModalEditar"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {proveedorSeleccionado && (
                <Formulario
                  campos={campos}
                  valoresIniciales={proveedorSeleccionado}
                  onEnviar={manejarActualizacion}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón agregar */}
      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#modalAgregarProveedor"
      >
        AGREGAR PROVEEDOR
      </button>
      {/* Tabla */}
      <Tablas
        data={proveedores}
        onEditar={editarProveedor}
        onEliminar={eliminarProveedor}
      />
    </div>
  );
}

export default Proveedores;
