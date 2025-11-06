import React, { useState, useEffect, useRef } from "react";
import "./Formulario.css";
import Swal from "sweetalert2";

function Formulario({ titulo, campos = [], onEnviar, onClose }) {
  const [valores, setValores] = useState({});
  const [opcionesSelect, setOpcionesSelect] = useState({});
  const fileRefs = useRef({}); // para limpiar inputs file
  
  
  const manejarCambio = (e) => {
    // soporta recibir un objeto simulado
    const { name, type, value, files, checked } = e.target ?? {};
    if (!name) return;
    setValores((prev) => ({
      ...prev,
      [name]:
        type === "file"
          ? files && files[0]
          : type === "checkbox"
          ? !!checked
          : value,
    }));
  };

  const resetForm = () => {
    setValores({});
    // limpiar inputs file del DOM
    Object.values(fileRefs.current).forEach((el) => {
      try {
        if (el && el.tagName === "INPUT" && el.type === "file") el.value = "";
      } catch (err) {
        /* ignorar */
      }
    });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      // onEnviar puede lanzar excepción si falla
      const resultado = onEnviar ? await onEnviar(valores) : null;

      // primero limpiar/reset y pedir al padre que cierre el modal (si viene)
      resetForm();
      if (typeof onClose === "function") onClose();

      // luego mostrar notificación de éxito
      await Swal.fire({
        icon: "success",
        title: "Envío realizado exitosamente",
        showConfirmButton: false,
        timer: 1400,
      });

      return resultado;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message || "No se pudo completar el envío",
      });
      // no cerramos modal en error
      throw error;
    }
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

        // helper para valor controlado
        const valorControlado = valores[campo.nombre];
        return (
          <div className="mb-3" key={index}>
            <label className="form-label">{campo.etiqueta}</label>

            {campo.tipo === "select" ? (
              <select
                className="form-select"
                name={campo.nombre}
                onChange={manejarCambio}
                value={valorControlado ?? ""}
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
                value={valorControlado ?? ""}
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
                        type: "checkbox",
                        checked: e.target.checked,
                      },
                    })
                  }
                  checked={!!valorControlado}
                />
                <label className="form-check-label">{campo.etiqueta}</label>
              </div>
            ) : campo.tipo === "file" ? (
              <input
                ref={(el) => (fileRefs.current[campo.nombre] = el)}
                type="file"
                className="form-control"
                name={campo.nombre}
                onChange={manejarCambio}
                required={campo.requerido}
              />
            ) : (
              <input
                type={campo.tipo}
                className="form-control"
                name={campo.nombre}
                onChange={manejarCambio}
                value={valorControlado ?? ""}
                required={campo.requerido}
              />
            )}
          </div>
        );
      })}

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </div>
    </form>
  );
}

export default Formulario;
