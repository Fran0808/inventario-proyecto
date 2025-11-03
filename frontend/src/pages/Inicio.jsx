import React, { useEffect, useState } from "react";
import TablasView from "../componentes/Tablas/TablasView";
import Cards from "../componentes/Cards/Cards"; // Ajusta la ruta según tu proyecto

function Inicio() {
  const [resumen, setResumen] = useState({
    total_productos: 0,
    valor_inventario: "0.00",
    productos_stock_bajo: 0,
    movimientos_hoy: 0,
  });
  const [stockBajo, setStockBajo] = useState([]);
  const [movimientosRecientes, setMovimientosRecientes] = useState([]);

  useEffect(() => {
    const obtenerResumen = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/inicio/resumen");
        const data = await res.json();
        setResumen(data);
      } catch (err) {
        console.error("Error al obtener el resumen:", err);
      }
    };

    const obtenerStockBajo = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/inicio/stock-bajo?limite=5"
        );
        const data = await res.json();
        setStockBajo(data);
      } catch (err) {
        console.error("Error al obtener stock bajo:", err);
      }
    };

    const obtenerMovimientos = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/inicio/movimientos-recientes?limite=5"
        );
        const data = await res.json();
        setMovimientosRecientes(data);
      } catch (err) {
        console.error("Error al obtener movimientos recientes:", err);
      }
    };

    obtenerResumen();
    obtenerStockBajo();
    obtenerMovimientos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Inicio</h2>

      {/* Resumen con KPIs */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <Cards titulo="Total Productos" valor={resumen.total_productos} />
        </div>
        <div className="col-md-3 mb-3">
          <Cards
            titulo="Valor Inventario"
            valor={`$${resumen.valor_inventario}`}
          />
        </div>
        <div className="col-md-3 mb-3">
          <Cards
            titulo="Productos Stock Bajo"
            valor={resumen.productos_stock_bajo}
          />
        </div>
        <div className="col-md-3 mb-3">
          <Cards titulo="Movimientos Hoy" valor={resumen.movimientos_hoy} />
        </div>
      </div>

      {/* Tablas */}
      <h3>Productos con stock bajo</h3>
      <TablasView data={stockBajo} />

      <h3 className="mt-5">Movimientos recientes</h3>
      <TablasView data={movimientosRecientes} />
    </div>
  );
}

export default Inicio;
