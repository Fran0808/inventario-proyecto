// models/dashboardModel.js
const db = require("../config/db");

const DashboardModel = {
  obtenerResumen: () => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT 
          COUNT(*) AS total_productos,
          IFNULL(SUM(stock_producto * precio_producto), 0) AS valor_inventario,
          SUM(CASE WHEN stock_producto < 25 THEN 1 ELSE 0 END) AS productos_stock_bajo,
          (SELECT COUNT(*) FROM movimientos WHERE DATE(fecha_movimiento) = CURDATE()) AS movimientos_hoy
        FROM producto
      `;
      db.query(sql, (err, results) => {
        if (err) return reject(err);
        resolve(results[0]);
      });
    });
  },

  obtenerProductosStockBajo: (limite = 5) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT id_producto, nombre_producto, stock_producto, precio_producto
        FROM producto
        WHERE stock_producto < 25
        ORDER BY stock_producto ASC
        LIMIT ?
      `;
      db.query(sql, [Number(limite)], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },

  obtenerMovimientosRecientes: (limite = 10) => {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT 
        m.id_movimiento, m.id_producto, p.nombre_producto, m.id_usuario, u.nombre_usuario, m.tipo_movimiento,
        m.fecha_movimiento, m.cantidad, m.nota
      FROM movimientos m
      JOIN producto p ON m.id_producto = p.id_producto
      JOIN usuario u ON m.id_usuario = u.id_usuario
      ORDER BY m.fecha_movimiento DESC
      LIMIT ?;
    `;

      db.query(sql, [Number(limite)], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  },
  obtenerMovimientosNDias: (days = 7, metric = "count") => {
    return new Promise((resolve, reject) => {
      const agg =
        metric === "sum"
          ? "SUM(m.cantidad) AS movimientos"
          : "COUNT(*) AS movimientos";
      const daysNum = Math.max(1, Number(days) || 7);

      // calcular fecha inicio en JS (incluye hoy)
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      d.setDate(d.getDate() - (daysNum - 1));
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      const startDate = `${yyyy}-${mm}-${dd}`; // 'YYYY-MM-DD'

      const sql = `
        SELECT DATE(m.fecha_movimiento) AS fecha,
               m.tipo_movimiento,
               ${agg}
        FROM movimientos m
        WHERE DATE(m.fecha_movimiento) >= ?
        GROUP BY DATE(m.fecha_movimiento), m.tipo_movimiento
        ORDER BY DATE(m.fecha_movimiento);
      `;
      db.query(sql, [startDate], (err, results) => {
        if (err) return reject(err);
        resolve(results); // [{fecha: '2025-11-03', tipo_movimiento: 'ENTRADA', movimientos: 5}, ...]
      });
    });
  },

  obtenerMovimientos7Dias: () => {
    return DashboardModel.obtenerMovimientosNDias(7, "count");
  },
};

module.exports = DashboardModel;
