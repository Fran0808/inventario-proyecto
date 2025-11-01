// controllers/productosController.js
const productoModel = require('../models/productosModel');

const validarProductoBody = (body) => {
  const { nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto } = body;

  if (!nombre_producto || typeof nombre_producto !== 'string' || nombre_producto.trim().length === 0) {
    return 'nombre_producto es requerido y debe ser texto';
  }
  if (id_categoria === undefined || id_categoria === null || isNaN(Number(id_categoria)) || !Number.isInteger(Number(id_categoria))) {
    return 'id_categoria es requerido y debe ser un entero';
  }
  if (id_proveedor === undefined || id_proveedor === null || isNaN(Number(id_proveedor)) || !Number.isInteger(Number(id_proveedor))) {
    return 'id_proveedor es requerido y debe ser un entero';
  }
  if (stock_producto === undefined || stock_producto === null || isNaN(Number(stock_producto)) || !Number.isInteger(Number(stock_producto))) {
    return 'stock_producto es requerido y debe ser un entero';
  }
  if (precio_producto === undefined || precio_producto === null || isNaN(Number(precio_producto))) {
    return 'precio_producto es requerido y debe ser numérico';
  }
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

  // verificar categoria
  productoModel.categoriaExists(req.body.id_categoria, (err, catExiste) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!catExiste) return res.status(400).json({ error: 'Categoria no encontrada' });

    // verificar proveedor
    productoModel.proveedorExists(req.body.id_proveedor, (err2, provExiste) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!provExiste) return res.status(400).json({ error: 'Proveedor no encontrado' });

      // crear producto
      productoModel.create(req.body, (err3, result) => {
        if (err3) return res.status(500).json({ error: err3.message });
        res.status(201).json({ message: 'Producto creado', id_producto: result.insertId });
      });
    });
  });
};

const actualizarProducto = (req, res) => {
  const { id } = req.params;
  const errorValid = validarProductoBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  // verificar categoria
  productoModel.categoriaExists(req.body.id_categoria, (err, catExiste) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!catExiste) return res.status(400).json({ error: 'Categoria no encontrada' });

    // verificar proveedor
    productoModel.proveedorExists(req.body.id_proveedor, (err2, provExiste) => {
      if (err2) return res.status(500).json({ error: err2.message });
      if (!provExiste) return res.status(400).json({ error: 'Proveedor no encontrado' });

      productoModel.updateById(id, req.body, (err3, result) => {
        if (err3) return res.status(500).json({ error: err3.message });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Producto no encontrado' });
        res.json({ message: 'Producto actualizado' });
      });
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
