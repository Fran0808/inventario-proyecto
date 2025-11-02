import React, { useState, useEffect } from "react";
import "./Formulario.css";

function Formulario({ titulo, campos = [], onEnviar }) {
  const [valores, setValores] = useState({});
  const [opcionesSelect, setOpcionesSelect] = useState({}); // Almacena las opciones cargadas dinámicamente

  // 🔹 Maneja cambios en los inputs
  const manejarCambio = (e) => {
    const { name, type, value, files } = e.target;
    setValores((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  // 🔹 Enviar datos al padre
  const manejarEnvio = (e) => {
    e.preventDefault();
    if (onEnviar) onEnviar(valores);
    console.log("Datos enviados:", valores);
  };

  // 🔹 Cargar opciones dinámicamente si el campo tiene `json` o `fetchUrl`
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

  // 🔹 Función auxiliar para detectar claves id/nombre automáticamente
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
      ) || claves[1] || claves[0];

    return { valueKey, textKey };
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{titulo}</h2>

      <form onSubmit={manejarEnvio}>
        {campos.map((campo, index) => {
          const opciones =
            campo.opciones || opcionesSelect[campo.nombre] || [];

          return (
            <div className="mb-3" key={index}>
              <label className="form-label">{campo.etiqueta}</label>

              {campo.tipo === "select" ? (
                // 🔹 SELECT
                <select
                  className="form-select"
                  name={campo.nombre}
                  onChange={manejarCambio}
                  value={valores[campo.nombre] || ""}
                  required={campo.requerido}
                >
                  <option value="">Seleccione una opción</option>
                  {Array.isArray(opciones) &&
                    opciones.map((op, i) => {
                      const { valueKey, textKey } = obtenerClaves(op);

                      // 🔧 Detección robusta de propiedades
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
                // 🔹 TEXTAREA
                <textarea
                  className="form-control"
                  name={campo.nombre}
                  onChange={manejarCambio}
                  value={valores[campo.nombre] || ""}
                  required={campo.requerido}
                ></textarea>
              ) : (
                // 🔹 INPUT (text, number, date, file, etc.)
                <input
                  type={campo.tipo}
                  className="form-control"
                  name={campo.nombre}
                  onChange={manejarCambio}
                  value={
                    campo.tipo === "file" ? undefined : valores[campo.nombre] || ""
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
    </div>
  );
}

export default Formulario;