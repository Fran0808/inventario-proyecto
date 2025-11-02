import React from "react";
import BarraLateral from "./componentes/BarraLateral/BarraLateral";
import Formulario from "./componentes/Formulario/Formulario";

function App() {

  const manejarEnvioProducto = (datos) => {
    console.log("Datos del producto:", datos);
  };

  return (
    <div className = "d-flex">
      <BarraLateral/>

      <main className = "flex-grow-1 p-4" style = {{ marginLeft: "260px" }}>
        <h1>Gestor de Inventario - Bodega</h1>
        <p>Bienvenido al sistema</p>

        <Formulario /*PROPS*/
          titulo="Agregar Producto"
          campos={[
            { nombre: "nombre_producto", etiqueta: "Nombre del producto", tipo: "text" },
            { nombre: "nombre_categoria", etiqueta: "Categoría", tipo: "text" },
            { nombre: "razon_social", etiqueta: "Proveedor", tipo: "text" },
            { nombre: "stock_producto", etiqueta: "Stock", tipo: "number" },
            { nombre: "precio_producto", etiqueta: "Precio", tipo: "number" },
            { nombre: "fecha_vencimiento", etiqueta: "Fecha de vencimiento", tipo: "date" }
          ]}
          onEnviar={manejarEnvioProducto}
        />

        <Formulario /*PROPS*/
          titulo="Agregar Usuario"
          campos={[
            { nombre: "nombre_usuario", etiqueta: "Nombre del usuario", tipo: "text" },
            { nombre: "rol", etiqueta: "Rol", tipo: "text" },
            { nombre: "contrasena", etiqueta: "Contraseña", tipo: "text" }
          ]}
          onEnviar={manejarEnvioProducto}
        />

        <Formulario /*PROPS*/
          titulo="Agregar Proveedor"
          campos={[
            { nombre: "razon_social", etiqueta: "Razón Social", tipo: "text" },
            { nombre: "telefono", etiqueta: "Telefono", tipo: "text" },
            { nombre: "contrasena", etiqueta: "Contraseña", tipo: "text" }
          ]}
          onEnviar={manejarEnvioProducto}
        />

      </main>
    </div>
  );
}

export default App;
