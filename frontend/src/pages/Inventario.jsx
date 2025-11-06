import React, { useEffect, useState } from "react";
import Formulario from "../componentes/Formulario/Formulario";
import Tablas from "../componentes/Tablas/Tablas";
import Swal from "sweetalert2";

function Inventario() {
  // Estados
  const [inventario, setInventario] = useState([]);
  const [productos, setProductos] = useState([]);
  const [movimientoSeleccionado, setMovimientoSeleccionado] = useState(null);

  // Obtener inventario desde el backend
  const obtenerInventario = async () => {
    try {
      const res = await fetch("http://localhost:3000/inventario");
      const data = await res.json();
      setInventario(data);
    } catch (error) {
      console.error("Error al obtener inventario:", error);
    }
  };

  // Obtener lista de productos
  const obtenerProductos = async () => {
    try {
      const res = await fetch("http://localhost:3000/productos");
      const data = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  // useEffect para cargar datos iniciales
  useEffect(() => {
    obtenerInventario();
    obtenerProductos();
  }, []);

  // Registrar nuevo movimiento
  const manejarEnvio = async (nuevoMovimiento) => {
    const movimientoConUsuario = {
      ...nuevoMovimiento,
      id_usuario: 1, // Valor por defecto
    };

    try {
      const res = await fetch("http://localhost:3000/inventario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movimientoConUsuario),
      });

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Movimiento registrado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });

        obtenerInventario();
        document.getElementById("cerrarModal")?.click();
      } else {
        const errorData = await res.json().catch(() => ({}));
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.error || "Error al registrar el movimiento",
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo completar la solicitud",
      });
    }
  };

  // Actualizar movimiento existente
  const manejarActualizacion = async (movimientoActualizado) => {
    if (!movimientoSeleccionado) return;

    const {
      id_movimiento,
      id_producto,
      tipo_movimiento,
      fecha_movimiento,
      cantidad,
      nota,
    } = movimientoActualizado;

    const body = {
      id_producto,
      id_usuario: 1,
      tipo_movimiento,
      fecha_movimiento,
      cantidad,
      nota,
    };

    try {
      const res = await fetch(
        `http://localhost:3000/inventario/${movimientoSeleccionado.id_movimiento}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Movimiento actualizado",
          showConfirmButton: false,
          timer: 1500,
        });

        obtenerInventario();
        document.getElementById("cerrarModalEditar")?.click();
      } else {
        const errorData = await res.json().catch(() => ({}));
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.error || "Error al actualizar el movimiento",
        });
      }
    } catch (error) {
      console.error("Error al actualizar movimiento:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el movimiento",
      });
    }
  };

  const eliminarMovimiento = async (movimiento) => {
    const result = await Swal.fire({
      title: "¿Eliminar movimiento?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return; // si cancela, no hace nada

    try {
      const res = await fetch(
        `http://localhost:3000/inventario/${movimiento.id_movimiento}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        await Swal.fire({
          icon: "success",
          title: "Movimiento eliminado",
          showConfirmButton: false,
          timer: 1500,
        });

        obtenerInventario();
      } else {
        const errorData = await res.json().catch(() => ({}));
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: errorData.error || "Error al eliminar el movimiento",
        });
      }
    } catch (error) {
      console.error("Error al eliminar movimiento:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo eliminar el movimiento",
      });
    }
  };

  // Abrir modal de edición con los datos del movimiento
  const editarMovimiento = (movimiento) => {
    setMovimientoSeleccionado(movimiento);
    const modalEditar = new bootstrap.Modal(
      document.getElementById("modalEditarMovimiento")
    );
    modalEditar.show();
  };

  // Campos del formulario
  const campos = [
    {
      nombre: "id_producto",
      etiqueta: "Producto",
      tipo: "select",
      opciones: productos,
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
      requerido: true,
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

      {/* Modal para agregar movimiento */}
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
                Nuevo Movimiento
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

      {/* Modal para editar movimiento */}
      <div
        className="modal fade"
        id="modalEditarMovimiento"
        tabIndex="-1"
        aria-labelledby="modalEditarMovimientoLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalEditarMovimientoLabel">
                Editar Movimiento
              </h5>
              <button
                id="cerrarModalEditar"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Cerrar"
              ></button>
            </div>
            <div className="modal-body">
              {movimientoSeleccionado && (
                <Formulario
                  titulo="Editar Movimiento"
                  campos={campos}
                  valoresIniciales={movimientoSeleccionado}
                  onEnviar={manejarActualizacion}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botón para abrir modal */}
      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#modalFormulario"
      >
        AGREGAR MOVIMIENTO
      </button>

      {/* Tabla de movimientos */}
      <Tablas
        data={inventario}
        onEditar={editarMovimiento}
        onEliminar={eliminarMovimiento}
      />
    </div>
  );
}

export default Inventario;
