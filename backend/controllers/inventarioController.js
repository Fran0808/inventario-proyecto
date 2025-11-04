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
      if (['Producto no encontrado', 'Usuario no encontrado', 'Stock insuficiente', 'Tipo de movimiento inválido'].includes(err.message)) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(result);
  });
};

// Nuevo método para filtrar movimientos entre fechas
const filtrarMovimientosPorFechas = (req, res) => {
  const { desde, hasta } = req.query;

  if (!desde || !hasta) {
    return res.status(400).json({ error: 'Debe proporcionar las fechas "desde" y "hasta".' });
  }

  const parseDate = (str) => new Date(str);
  const desdeDate = parseDate(desde);
  const hastaDate = parseDate(hasta);

  if (isNaN(desdeDate) || isNaN(hastaDate)) {
    return res.status(400).json({ error: 'Formato de fecha inválido. Use YYYY-MM-DD.' });
  }

  if (desdeDate > hastaDate) {
    return res.status(400).json({ error: 'La fecha "desde" no puede ser mayor que "hasta".' });
  }

  const desdeStr = `${desde} 00:00:00`;
  const hastaStr = `${hasta} 23:59:59`;

  inventarioModel.getBetween(desdeStr, hastaStr, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const actualizarMovimiento = (req, res) => {
  const { id } = req.params;
  const errorValid = validarMovimientoBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  inventarioModel.updateById(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json({ message: 'Movimiento actualizado correctamente' });
  });
};

const eliminarMovimiento = (req, res) => {
  const { id } = req.params;
  inventarioModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0)
      return res.status(404).json({ message: 'Movimiento no encontrado' });
    res.json({ message: 'Movimiento eliminado correctamente' });
  });
};

module.exports = {
  obtenerMovimientos,
  obtenerMovimientoPorId,
  crearMovimiento,
  filtrarMovimientosPorFechas,
  actualizarMovimiento, 
  eliminarMovimiento    
};
