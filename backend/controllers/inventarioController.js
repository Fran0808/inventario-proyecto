// controllers/inventarioController.js
const inventarioModel = require('../models/inventarioModel');

const validarMovimientoBody = (body) => {
  const { id_producto, id_usuario, tipo_movimiento, cantidad } = body;
  if (id_producto === undefined || isNaN(Number(id_producto))) return 'id_producto inválido';
  if (id_usuario === undefined || isNaN(Number(id_usuario))) return 'id_usuario inválido';
  if (!['ENTRADA', 'SALIDA'].includes(tipo_movimiento)) return 'tipo_movimiento debe ser ENTRADA o SALIDA';
  if (cantidad === undefined || isNaN(Number(cantidad)) || !Number.isInteger(Number(cantidad)) || Number(cantidad) <= 0) return 'cantidad inválida';
  return null;
};

const obtenerMovimientos = (req, res) => {
  inventarioModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const obtenerMovimientoPorId = (req, res) => {
  const { id } = req.params;
  inventarioModel.getById(id, (err, movimiento) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!movimiento) return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json(movimiento);
  });
};

const crearMovimiento = (req, res) => {
  const errorValid = validarMovimientoBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  inventarioModel.create(req.body, (err, result) => {
    if (err) {
      // errores esperados: Producto no encontrado, Usuario no encontrado, Stock insuficiente
      if (err.message === 'Producto no encontrado' || err.message === 'Usuario no encontrado' || err.message === 'Stock insuficiente' || err.message === 'Tipo de movimiento inválido') {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
};

module.exports = {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento
};
