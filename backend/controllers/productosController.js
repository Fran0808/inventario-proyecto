// controllers/productosController.js
const productoModel = require('../models/productosModel');

const validarProductoBody = (body) => {
  const { nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto } = body;
  if (!nombre_producto || typeof nombre_producto !== 'string') return '...';
  if (!nombre_categoria || typeof nombre_categoria !== 'string') return '...';
  if (id_proveedor === undefined || isNaN(Number(id_proveedor))) return '...';
  if (stock_producto === undefined || !Number.isInteger(Number(stock_producto))) return '...';
  if (precio_producto === undefined || isNaN(Number(precio_producto))) return '...';
  return null;
};

const obtenerProductos = (req, res) => {
  productoModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: 'Error al consultar productos', detail: err.message });
    res.json(results);
  });
};

const obtenerProductoPorId = (req, res) => {
  const { id } = req.params;
  productoModel.getById(id, (err, producto) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(producto);
  });
};

const crearProducto = (req, res) => {
  const errorValid = validarProductoBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  productoModel.proveedorExists(req.body.id_proveedor, (err, existe) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!existe) return res.status(400).json({ error: 'Proveedor no encontrado' });

    productoModel.create(req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Producto creado', id_producto: result.insertId });
    });
  });
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const errorValid = validarProductoBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  productoModel.proveedorExists(req.body.id_proveedor, (err, existe) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!existe) return res.status(400).json({ error: 'Proveedor no encontrado' });

    productoModel.updateById(id, req.body, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
      res.json({ message: 'Producto actualizado' });
    });
  });
};

const eliminarProducto = (req, res) => {
  const { id } = req.params;
  productoModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  });
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto
};
