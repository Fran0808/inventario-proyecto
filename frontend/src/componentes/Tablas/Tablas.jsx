import "./Tablas.css";

function Tablas({ data, onEditar = () => {}, onEliminar = () => {} }) {
  if (!data || data.length === 0) {
    return <p className="text-center p-3">No hay datos para mostrar</p>;
  }
  const columnas = [...new Set(data.flatMap(Object.keys))];
  return (
    <div className="table-responsive">
      <table className="table text-center table-bordered align-middle">
        <thead>
          <tr>
            {columnas.map((col) => (
              <th key={col} className="text-center text-uppercase">
                {col}
              </th>
            ))}
            <th className="text-center text-uppercase">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              {columnas.map((col) => (
                <td key={col}>{item[col] !== undefined ? item[col] : "-"}</td>
              ))}

              <td className="text-center">
                <button
                  className="btn btn-success my-1 mx-1 btn-sm"
                  onClick={() => onEditar(item)}
                >
                  EDITAR
                </button>
                <button
                  className="btn btn-success my-1 mx-1 btn-sm"
                  onClick={() => onEliminar(item)}
                >
                  ELIMINAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Tablas;
