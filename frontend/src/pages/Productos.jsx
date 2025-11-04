
import React, { useEffect, useState } from "react";
import Formulario from "../componentes/Formulario/Formulario";
import Tablas from "../componentes/Tablas/Tablas";
import "./Style.css";
function Productos() {
  // Estados para datos
  const [datosCategorias, setDatosCategorias] = useState([]);
  const [datosProveedores, setDatosProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);

  // Función para obtener los productos
  const obtenerProductos = async () => {
    const res = await fetch("http://localhost:3000/productos");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // Función para manejar el envío del formulario
  const manejarEnvio = async (nuevoProducto) => {
    const res = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoProducto),
    });

    if (res.ok) {
      alert("Producto agregado correctamente");
      obtenerProductos(); // ⬅️ Recargamos los datos
    } else {
      alert("Error al agregar producto");
    }
  };

  const manejarActualizacion = async (productoActualizado) => {
    if (!productoSeleccionado) return;

    const {
      id_producto,
      nombre_producto,
      id_categoria,
      id_proveedor,
      stock_producto,
      precio_producto,
    } = productoActualizado;

    const body = {
      nombre_producto,
      id_categoria,
      id_proveedor,
      stock_producto,
      precio_producto,
    };

    const res = await fetch(
      `http://localhost:3000/productos/${productoSeleccionado.id_producto}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (res.ok) {
      alert("Producto actualizado correctamente");
      obtenerProductos();
      document.getElementById("cerrarModalEditar").click();
    } else {
      const errorData = await res.json();
      alert("Error al actualizar el producto: " + errorData.error);
    }
  };

  // Eliminar proveedor
  const eliminarProducto = async (producto) => {
    if (!window.confirm("¿Eliminar producto?")) return;
    const res = await fetch(
      `http://localhost:3000/productos/${producto.id_producto}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      alert("Producto eliminado");
      obtenerProductos();
    }
  };

  // Editar producto
  const editarProducto = (producto) => {
    setProductoSeleccionado(producto);
    const modalEditar = new bootstrap.Modal(
      document.getElementById("modalEditarProducto")
    );
    modalEditar.show();
  };

  // Obtener categorías del backend
  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data) => setDatosCategorias(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  // Obtener categorías del backend
  useEffect(() => {
    fetch("http://localhost:3000/proveedores")
      .then((response) => response.json())
      .then((data) => setDatosProveedores(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  // Configuración de los campos del formulario
  const campos = [
    {
      nombre: "nombre_producto",
      etiqueta: "Nombre del producto",
      tipo: "text",
      requerido: true,
    },
    {
      nombre: "id_categoria",
      etiqueta: "Categoría",
      tipo: "select",
      opciones: datosCategorias, 
      requerido: true,
    },
    {
      nombre: "id_proveedor",
      etiqueta: "Proveedor",
      tipo: "select",
      opciones: datosProveedores, 
      requerido: true,
    },
    {
      nombre: "stock_producto",
      etiqueta: "Stock",
      tipo: "number",
      requerido: true,
    },
    {
      nombre: "precio_producto",
      etiqueta: "Precio",
      tipo: "number",
      requerido: true,
    },
  ];

  // 🔹 Renderizado
  return (
    <div className="mx-4">
      <h1>PRODUCTOS DISPONIBLES</h1>
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
                Agregar Producto
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
                titulo="Nuevo Producto"
                campos={campos}
                onEnviar={manejarEnvio}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="modalEditarProducto"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Editar Producto</h5>
              <button
                id="cerrarModalEditar"
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {productoSeleccionado && (
                <Formulario
                  campos={campos}
                  valoresIniciales={productoSeleccionado}
                  onEnviar={manejarActualizacion}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#modalFormulario"
      >
        AGREGAR PRODUCTO
      </button>
      <Tablas
        data={productos}
        onEditar={editarProducto}
        onEliminar={eliminarProducto}
      />
    </div>
  );
}

export default Productos;
