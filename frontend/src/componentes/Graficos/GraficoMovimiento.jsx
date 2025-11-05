// Graficos/GraficoMovimiento.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function GraficoMovimiento() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Colores ---
  const COLOR_ENTRADAS_BG = "rgba(56, 161, 105, 0.6)";
  const COLOR_ENTRADAS_BORDER = "rgba(56, 161, 105, 1)";

  const COLOR_SALIDAS_BG = "rgba(229, 62, 62, 0.6)";
  const COLOR_SALIDAS_BORDER = "rgba(229, 62, 62, 1)";
  // -----------------------------------------

  function friendlyDateLabel(isoDate) {
    try {
      const d = new Date(isoDate + "T00:00:00");
      return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short" });
    } catch {
      return isoDate;
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "http://localhost:3000/api/inicio/movimientos-7d"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        const labels = (data.labels || []).map((l) => friendlyDateLabel(l));
        const dataEntradas = data.datasets?.[0]?.data || [];
        const dataSalidas = data.datasets?.[1]?.data || [];

        const chart = {
          labels,
          datasets: [
            {
              label: "Entradas",
              data: dataEntradas,
              backgroundColor: "rgba(56, 161, 105, 0.6)",
              borderColor: "rgba(56, 161, 105, 1)",
              borderWidth: 2,
            },
            {
              label: "Salidas",
              data: dataSalidas,
              backgroundColor: "rgba(229, 62, 62, 0.6)",
              borderColor: "rgba(229, 62, 62, 1)",
              borderWidth: 2,
            },
          ],
        };

        if (isMounted) setChartData(chart);
      } catch (err) {
        if (isMounted) setError("No se pudo cargar el gráfico");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    // Llamada inicial
    fetchData();

    // Refrescar cada 1 minutos
    const intervalId = setInterval(fetchData, 1 * 60 * 1000);

    // Limpieza al desmontar el componente
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>{error}</div>;
  if (!chartData) return <div>No hay datos para mostrar</div>;

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Movimientos últimos 7 días" },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            const val = context.parsed.y ?? context.parsed;
            return `${label}: ${val}`;
          },
        },
      },
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true, ticks: { precision: 0 } },
    },
  };

  return (
    <div style={{ width: "100%", maxWidth: 900 }}>
      <Bar options={options} data={chartData} />
    </div>
  );
}
