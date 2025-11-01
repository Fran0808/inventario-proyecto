// models/productosModel.js
const db = require('../config/db');

const getAll = (cb) => {
  const sql = 'SELECT * FROM productos';
  db.query(sql, (err, results) => cb(err, results));
};

const getById = (id, cb) => {
  const sql = 'SELECT * FROM productos WHERE id_producto = ?';
  db.query(sql, [id], (err, results) => cb(err, results && results[0]));
};

const create = (producto, cb) => {
  const { nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto } = producto;
  const sql = `INSERT INTO productos (nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto], (err, results) => cb(err, results));
};

const updateById = (id, producto, cb) => {
  const { nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto } = producto;
  const sql = `UPDATE productos SET nombre_producto = ?, nombre_categoria = ?, id_proveedor = ?, stock_producto = ?, precio_producto = ?
               WHERE id_producto = ?`;
  db.query(sql, [nombre_producto, nombre_categoria, id_proveedor, stock_producto, precio_producto, id], (err, results) => cb(err, results));
};

const deleteById = (id, cb) => {
  const sql = 'DELETE FROM productos WHERE id_producto = ?';
  db.query(sql, [id], (err, results) => cb(err, results));
};

const proveedorExists = (idProveedor, cb) => {
  const sql = 'SELECT id_proveedor FROM proveedores WHERE id_proveedor = ? LIMIT 1';
  db.query(sql, [idProveedor], (err, results) => cb(err, !!(results && results.length)));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  proveedorExists
};
