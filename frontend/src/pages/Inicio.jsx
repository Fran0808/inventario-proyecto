// Inicio.jsx
import React, { useEffect, useState } from "react";
import TablasView from "../componentes/Tablas/TablasView";
import "./Style.css";
import Cards from "../componentes/Cards/Cards";
import GraficoMovimiento from "../componentes/Graficos/GraficoMovimiento";

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
    <div className="mx-4">
      <h1>PANEL DE INVENTARIO</h1>

      {/* Resumen con KPIs */}
      <div className="row mb-3">
        <div className="col-md-3 mb-3">
          <Cards titulo="Total Productos" valor={resumen.total_productos} />
        </div>
        <div className="col-md-3 mb-3">
          <Cards
            titulo="Valor Inventario"
            valor={`S/${resumen.valor_inventario}`}
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

      {/* Gráfico */}
      <div className="mb-4">
        <GraficoMovimiento />
      </div>

      {/* Tablas */}
      <h2>Productos con stock bajo</h2>
      <TablasView data={stockBajo} />

      <h2 className="mt-4">Movimientos recientes</h2>
      <TablasView data={movimientosRecientes} />
    </div>
  );
}

export default Inicio;
