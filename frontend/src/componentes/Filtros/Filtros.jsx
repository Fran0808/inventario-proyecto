import "./Filtros.css"

function Filtros({ campos = [], botones = [] }) {
  return (
    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-3 flex-wrap gap-2">
      {/* Campos dinámicos */}
      <div className="d-flex gap-2 flex-wrap">
        {campos.map((campo, index) => (
          <div key={index}>
            {campo.element}
          </div>
        ))}
      </div>
      {/* Botones dinámicos */}
      <div className="d-flex gap-2 flex-wrap">
        {botones.map((btn, i) => (
          <button 
            key={i} 
            className={btn.className || "btn btn-secondary"}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filtros;