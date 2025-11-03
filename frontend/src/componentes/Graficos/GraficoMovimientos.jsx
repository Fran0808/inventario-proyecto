import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export default function GraficoMovimientos() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dashboard/movimientos")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error al cargar gráfico:", err));
  }, []);

  return (
    <div style={{ width: "100%", height: 300, marginBottom: "2rem" }}>
      <h3>Movimientos de Inventario por Fecha</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
