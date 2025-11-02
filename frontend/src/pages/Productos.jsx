import React from 'react';
import Formulario from '../componentes/Formulario/Formulario';

function Productos() {

    const manejarEnvioProductos = (datos) => {
        console.log("Producto registrado: ", datos)
    }

    return(
        <div>
            <h2>Productos</h2>
            <Formulario /*PROPS*/
            titulo = "Agregar Producto"
            campos = {[
                { nombre: "nombre_producto", etiqueta: "Nombre del producto", tipo: "text" },
                { nombre: "nombre_categoria", etiqueta: "Categoría", tipo: "text" },
                { nombre: "razon_social", etiqueta: "Proveedor", tipo: "text" },
                { nombre: "stock_producto", etiqueta: "Stock", tipo: "number" },
                { nombre: "precio_producto", etiqueta: "Precio", tipo: "number" },
                { nombre: "fecha_vencimiento", etiqueta: "Fecha de vencimiento", tipo: "date" }
            ]}
            onEnviar = {manejarEnvioProductos}
            />
        </div>
    );
}

export default Productos;