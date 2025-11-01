//controllers/proveedorController.js
const proveedorModel = require('../models/proveedorModel')

const validarProveedorBody = (body) => {
  const { razon_social, telefono, activo } = body;
  if (!razon_social || typeof razon_social !== 'string') return 'Razón social inválida';
  if (telefono && typeof telefono !== 'string') return 'Teléfono inválido';
  if (activo === undefined || typeof activo !== 'boolean') return 'Activo debe ser true o false';
  return null;
};

const obtenerProveedores = (req, res) => {
  proveedorModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const obtenerProveedorPorId = (req, res) => {
  const { id } = req.params;
  proveedorModel.getById(id, (err, proveedor) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!proveedor) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json(proveedor);
  });
};

const crearProveedor = (req, res) => {
  const errorValid = validarProveedorBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  proveedorModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Proveedor creado', id_proveedor: result.insertId });
  });
};

const actualizarProveedor = (req, res) => {
  const { id } = req.params;
  const errorValid = validarProveedorBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  proveedorModel.updateById(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor actualizado' });
  });
};

const eliminarProveedor = (req, res) => {
  const { id } = req.params;
  proveedorModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Proveedor no encontrado' });
    res.json({ message: 'Proveedor eliminado' });
  });
};

module.exports = {
  obtenerProveedores,
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
};