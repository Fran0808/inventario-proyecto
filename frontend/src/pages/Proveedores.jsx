import React from 'react';
import Formulario from '../componentes/Formulario/Formulario';

function Proveedores() {

    const manejarEnvioProveedor = (datos) => {
        console.log("Proveedor registrado:", datos);
    };

    return(
        <div>
            <h2>Registra los Proveedores</h2>
            <Formulario /*PROPS*/
                titulo="Agregar Proveedor"
                campos={[
                    { nombre: "razon_social", etiqueta: "Razón Social", tipo: "text" },
                    { nombre: "telefono", etiqueta: "Telefono", tipo: "text" },
                    { nombre: "estado_proveedor", etiqueta: "Estado", tipo: "text" }
                ]}
                onEnviar={manejarEnvioProveedor}
            />
        </div>
    );
}

export default Proveedores;