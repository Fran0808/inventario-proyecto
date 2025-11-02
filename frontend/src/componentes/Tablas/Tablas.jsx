import './Filtros.css'

function Tablas({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center p-3">No hay datos para mostrar</p>;
  }
  const columnas = [...new Set(data.flatMap(Object.keys))];
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped align-middle">
        <thead className="table-dark">
          <tr>
            {columnas.map((col) => (
              <th key={col} className="text-center text-uppercase">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, i) => (
            <tr key={i}>
              {columnas.map((col) => (
                <td key={col}>{item[col] !== undefined ? item[col] : "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Tablas;