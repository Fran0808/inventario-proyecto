// controllers/dashboardController.js
const DashboardModel = require('../models/dashboardModel');

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
    console.error('Error en obtenerResumen:', err);
    return res.status(500).json({ error: 'Error al obtener resumen' });
  }
};

exports.obtenerProductosStockBajo = async (req, res) => {
  try {
    const limite = req.query.limite || 5;
    const filas = await DashboardModel.obtenerProductosStockBajo(limite);
    return res.json(filas);
  } catch (err) {
    console.error('Error en obtenerProductosStockBajo:', err);
    return res.status(500).json({ error: 'Error al obtener productos con stock bajo' });
  }
};

exports.obtenerMovimientosRecientes = async (req, res) => {
  try {
    const limite = req.query.limite || 10;
    const filas = await DashboardModel.obtenerMovimientosRecientes(limite);
    return res.json(filas);
  } catch (err) {
    console.error('Error en obtenerMovimientosRecientes:', err);
    return res.status(500).json({ error: 'Error al obtener movimientos recientes' });
  }
};

