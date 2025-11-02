import React, { useEffect, useState } from "react";
import Formulario from "../componentes/Formulario/Formulario";
import Tablas from "../componentes/Tablas/Tablas";

function Productos() {
  // 🔹 Estados para datos
  const [datosCategorias, setDatosCategorias] = useState([]);
  const [datosProveedores, setDatosProveedores] = useState([]);
  const [productos, setProductos] = useState([]);

  // 🔹 Función para obtener los productos
  const obtenerProductos = async () => {
    const res = await fetch("http://localhost:3000/productos");
    const data = await res.json();
    setProductos(data);
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  // 🔹 Función para manejar el envío del formulario
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
  
  // 🔹 Obtener categorías del backend
  useEffect(() => {
    fetch("http://localhost:3000/categorias")
      .then((response) => response.json())
      .then((data) => setDatosCategorias(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

    // 🔹 Obtener categorías del backend
  useEffect(() => {
    fetch("http://localhost:3000/proveedores")
      .then((response) => response.json())
      .then((data) => setDatosProveedores(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  // 🔹 Configuración de los campos del formulario
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
      opciones: datosCategorias, // ✅ Aquí se usan las categorías cargadas dinámicamente
      requerido: true,
    },
    {
      nombre: "id_proveedor",
      etiqueta: "Proveedor",
      tipo: "select",
      opciones: datosProveedores, // ✅ Aquí se usan los Proveedores cargadas dinámicamente
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
        <div className="container mt-4">
      <h2>Productos</h2>
      <button
        className="btn btn-success my-3"
        data-bs-toggle="modal"
        data-bs-target="#modalFormulario"
      >
        Agregar Producto
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
              <Formulario titulo="Nuevo Producto" campos={campos} onEnviar={manejarEnvio} />
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5">Lista de productos</h3>
      <Tablas data={productos} />
    </div>
  );
}

export default Productos;
