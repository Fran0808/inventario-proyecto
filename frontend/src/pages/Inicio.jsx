import React, { useEffect, useState } from "react";
import TablasView from "../componentes/Tablas/TablasView";

function Inicio() {
  const [stockBajo, setStockBajo] = useState([]);
  const [movimientosRecientes, setMovimientosRecientes] = useState([]);

  useEffect(() => {
    const obtenerStockBajo = async () => {
      const res = await fetch(
        "http://localhost:3000/api/inicio/stock-bajo?limite=5"
      );
      const data = await res.json();
      setStockBajo(data);
    };

    const obtenerMovimientos = async () => {
      const res = await fetch(
        "http://localhost:3000/api/inicio/movimientos-recientes?limite=5"
      );
      const data = await res.json();
      setMovimientosRecientes(data);
    };

    obtenerStockBajo();
    obtenerMovimientos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inicio</h2>

      <h3>Productos con stock bajo</h3>
      <TablasView data={stockBajo} />

      <h3 className="mt-5">Movimientos recientes</h3>
      <TablasView data={movimientosRecientes} />
    </div>
  );
}

export default Inicio;
