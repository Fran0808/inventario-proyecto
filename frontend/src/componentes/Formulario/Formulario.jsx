import React, { useState } from "react";
import "./Formulario.css";

function Formulario({ titulo, campos, onEnviar }) {
    const [mostrar, setMostrar] = useState(false);
    const [valores, setValores] = useState({});

    const manejarCambio = (e) => {
        setValores({ ...valores, [e.target.name]: e.target.value})
    };

    const manejarEnvio = (e) => {
        e.preventDefault()
        onEnviar(valores)
        setMostrar(false)
    };

    return (
    <>
      {/* Botón para abrir el modal */}
      <button className="btn btn-primary" onClick={() => setMostrar(true)}>
        {titulo}
      </button>

      {/* Modal (Bootstrap puro) */}
      {mostrar && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Encabezado */}
              <div className="modal-header">
                <h5 className="modal-title">{titulo}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setMostrar(false)}
                ></button>
              </div>

              {/* Cuerpo */}
              <div className="modal-body">
                <form onSubmit={manejarEnvio}>
                  {campos.map((campo) => (
                    <div className="mb-3" key={campo.nombre}>
                      <label className="form-label">{campo.etiqueta}</label>
                      <input
                        type={campo.tipo}
                        name={campo.nombre}
                        className="form-control"
                        value={valores[campo.nombre] || ""}
                        onChange={manejarCambio}
                        required
                      />
                    </div>
                  ))}
                  <button type="submit" className="btn btn-success">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    );
}

export default Formulario;