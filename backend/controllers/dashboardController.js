// controllers/dashboardController.js
const DashboardModel = require("../models/dashboardModel");

exports.obtenerResumen = async (req, res) => {
  try {
    const fila = await DashboardModel.obtenerResumen();
    return res.json({
      total_productos: Number(fila.total_productos || 0),
      valor_inventario: Number(fila.valor_inventario || 0).toFixed(2),
      productos_stock_bajo: Number(fila.productos_stock_bajo || 0),
      movimientos_hoy: Number(fila.movimientos_hoy || 0)
    });
  } catch (err) {
    console.error("Error en obtenerResumen:", err);
    return res.status(500).json({ error: "Error al obtener resumen" });
  }
};

exports.obtenerProductosStockBajo = async (req, res) => {
  try {
    const limite = req.query.limite || 5;
    const filas = await DashboardModel.obtenerProductosStockBajo(limite);
    return res.json(filas);
  } catch (err) {
    console.error("Error en obtenerProductosStockBajo:", err);
    return res
      .status(500)
      .json({ error: "Error al obtener productos con stock bajo" });
  }
};

exports.obtenerMovimientosRecientes = async (req, res) => {
  try {
    const limite = req.query.limite || 10;
    const filas = await DashboardModel.obtenerMovimientosRecientes(limite);
    return res.json(filas);
  } catch (err) {
    console.error("Error en obtenerMovimientosRecientes:", err);
    return res
      .status(500)
      .json({ error: "Error al obtener movimientos recientes" });
  }
};

function pad2(n) {
  return String(n).padStart(2, "0");
}
function formatDateYMD(d) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}
function lastNDates(n) {
  const arr = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    arr.push(formatDateYMD(d));
  }
  return arr;
}
function normalizeFechaToYMD(fechaVal) {
  if (!fechaVal && fechaVal !== 0) return null;
  if (typeof fechaVal === "string") {
    const m = fechaVal.match(/^(\d{4}-\d{2}-\d{2})/);
    if (m) return m[1];
    const d = new Date(fechaVal);
    if (!isNaN(d)) return formatDateYMD(d);
    return fechaVal;
  }
  if (fechaVal instanceof Date) return formatDateYMD(fechaVal);
  if (typeof fechaVal === "number") {
    const d = new Date(fechaVal);
    return formatDateYMD(d);
  }
  return String(fechaVal);
}

exports.obtenerMovimientos7Dias = async (req, res) => {
  try {
    console.log("[dashboardController] obtenerMovimientos7Dias called");
    const rows = await DashboardModel.obtenerMovimientos7Dias();
    console.log(
      "[dashboardController] raw rows:",
      JSON.stringify(rows, null, 2)
    );

    const labels = lastNDates(7);
    const idxMap = labels.reduce((acc, d, i) => {
      acc[d] = i;
      return acc;
    }, {});
    const entradas = Array(labels.length).fill(0);
    const salidas = Array(labels.length).fill(0);

    for (const r of rows) {
      const rawFecha = r.fecha ?? r.FECHA ?? null;
      const fechaNorm = normalizeFechaToYMD(rawFecha);
      console.log(
        "[dashboardController] row:",
        rawFecha,
        "->",
        fechaNorm,
        "tipo:",
        r.tipo_movimiento,
        "mov:",
        r.movimientos
      );
      const i = idxMap[fechaNorm];
      if (i === undefined) {
        console.log("[dashboardController] fecha fuera de rango:", fechaNorm);
        continue;
      }
      const val = Number(r.movimientos || 0);
      const tipo = (r.tipo_movimiento || "").toUpperCase();
      if (tipo === "ENTRADA") entradas[i] += val;
      else if (tipo === "SALIDA") salidas[i] += val;
      else
        console.log(
          "[dashboardController] tipo inesperado:",
          r.tipo_movimiento
        );
    }

    const totals = {
      entradas: entradas.reduce((s, v) => s + v, 0),
      salidas: salidas.reduce((s, v) => s + v, 0),
    };
    console.log("[dashboardController] totals:", totals);

    return res.json({
      labels,
      datasets: [
        { label: "Entradas", data: entradas },
        { label: "Salidas", data: salidas },
      ],
      totals,
    });
  } catch (err) {
    console.error("Error en obtenerMovimientos7Dias:", err);
    return res
      .status(500)
      .json({ error: "Error al obtener movimientos 7 días" });
  }
};

exports.obtenerMovimientosNDias = async (req, res) => {
  try {
    const days = Math.max(1, Math.min(30, Number(req.query.days || 7)));
    const metric = req.query.metric === "sum" ? "sum" : "count";
    const rows = await DashboardModel.obtenerMovimientosNDias(days, metric);
    // reutiliza la misma lógica de normalización (puedes extraer a función si prefieres)
    const labels = lastNDates(days);
    const idxMap = labels.reduce((acc, d, i) => {
      acc[d] = i;
      return acc;
    }, {});
    const entradas = Array(labels.length).fill(0);
    const salidas = Array(labels.length).fill(0);

    for (const r of rows) {
      const fechaNorm = normalizeFechaToYMD(r.fecha ?? r.FECHA ?? null);
      const i = idxMap[fechaNorm];
      if (i === undefined) continue;
      const val = Number(r.movimientos || 0);
      const tipo = (r.tipo_movimiento || "").toUpperCase();
      if (tipo === "ENTRADA") entradas[i] += val;
      else if (tipo === "SALIDA") salidas[i] += val;
    }

    const totals = {
      entradas: entradas.reduce((s, v) => s + v, 0),
      salidas: salidas.reduce((s, v) => s + v, 0),
    };
    return res.json({
      labels,
      datasets: [
        { label: "Entradas", data: entradas },
        { label: "Salidas", data: salidas },
      ],
      totals,
      meta: { days, metric },
    });
  } catch (err) {
    console.error("Error en obtenerMovimientosNDias:", err);
    return res.status(500).json({ error: "Error al obtener movimientos" });
  }
};
