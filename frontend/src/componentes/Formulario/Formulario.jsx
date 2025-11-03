import React, { useState, useEffect } from "react";
import "./Formulario.css";

function Formulario({ titulo, campos = [], onEnviar }) {
  /*Propiedades Props*/
  const [valores, setValores] = useState({});
  const [opcionesSelect, setOpcionesSelect] = useState({});

  const manejarCambio = (e) => {
    const { name, type, value, files } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (onEnviar) onEnviar(valores);
  };

  useEffect(() => {
    const cargarDatos = async () => {
      const nuevasOpciones = {};
      for (const campo of campos) {
        if (campo.tipo === "select" && (campo.json || campo.fetchUrl)) {
          try {
            const url = campo.json || campo.fetchUrl;
            const respuesta = await fetch(url);
            const datos = await respuesta.json();
            nuevasOpciones[campo.nombre] = datos;
          } catch (error) {
            console.error(`Error al cargar datos para ${campo.nombre}:`, error);
            nuevasOpciones[campo.nombre] = [];
          }
        }
      }
      setOpcionesSelect((prev) => ({ ...prev, ...nuevasOpciones }));
    };
    cargarDatos();
  }, [campos]);

  const obtenerClaves = (obj) => {
    const claves = Object.keys(obj);
    const valueKey =
      claves.find((k) =>
        ["id", "valor", "value"].some((x) => k.toLowerCase().includes(x))
      ) || claves[0];

    const textKey =
      claves.find((k) =>
        ["nombre", "texto", "label", "descripcion"].some((x) =>
          k.toLowerCase().includes(x)
        )
      ) ||
      claves[1] ||
      claves[0];

    return { valueKey, textKey };
  };

  return (
    <form onSubmit={manejarEnvio}>
      <h5 className="mb-3">{titulo}</h5>

      {campos.map((campo, index) => {
        const opciones = campo.opciones || opcionesSelect[campo.nombre] || [];

        return (
          <div className="mb-3" key={index}>
            <label className="form-label">{campo.etiqueta}</label>

            {campo.tipo === "select" ? (
              <select
                className="form-select"
                name={campo.nombre}
                onChange={manejarCambio}
                value={valores[campo.nombre] || ""}
                required={campo.requerido}
              >
                <option value="">Seleccione una opción</option>
                {opciones.map((op, i) => {
                  const { valueKey, textKey } = obtenerClaves(op);
                  const valor = op[valueKey] ?? op.id ?? op.codigo ?? i;
                  const texto =
                    op[textKey] ??
                    op.nombre ??
                    op.descripcion ??
                    JSON.stringify(op);
                  return (
                    <option key={i} value={valor}>
                      {texto}
                    </option>
                  );
                })}
              </select>
            ) : campo.tipo === "textarea" ? (
              <textarea
                className="form-control"
                name={campo.nombre}
                onChange={manejarCambio}
                value={valores[campo.nombre] || ""}
                required={campo.requerido}
              />
            ) : campo.tipo === "checkbox" ? (
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  name={campo.nombre}
                  onChange={(e) =>
                    manejarCambio({
                      target: {
                        name: campo.nombre,
                        value: e.target.checked,
                      },
                    })
                  }
                  checked={valores[campo.nombre] || false}
                />
                <label className="form-check-label">{campo.etiqueta}</label>
              </div>
            ) : (
              <input
                type={campo.tipo}
                className="form-control"
                name={campo.nombre}
                onChange={manejarCambio}
                value={
                  campo.tipo === "file"
                    ? undefined
                    : valores[campo.nombre] || ""
                }
                required={campo.requerido}
              />
            )}
          </div>
        );
      })}
      <button type="submit" className="btn btn-primary">
        Guardar
      </button>
    </form>
  );
}

export default Formulario;
