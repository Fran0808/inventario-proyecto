// models/productosModel.js
const db = require('../config/db');

const getAll = (cb) => {
  const sql = 'SELECT * FROM producto';
  db.query(sql, (err, results) => cb(err, results));
};

const getById = (id, cb) => {
  const sql = 'SELECT * FROM producto WHERE id_producto = ?';
  db.query(sql, [id], (err, results) => cb(err, results && results[0]));
};

const create = (producto, cb) => {
  const { nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto } = producto;
  const sql = `INSERT INTO producto (nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto], (err, results) => cb(err, results));
};

const updateById = (id, producto, cb) => {
  const { nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto } = producto;
  const sql = `UPDATE producto
               SET nombre_producto = ?, id_categoria = ?, id_proveedor = ?, stock_producto = ?, precio_producto = ?
               WHERE id_producto = ?`;
  db.query(sql, [nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto, id], (err, results) => cb(err, results));
};

const deleteById = (id, cb) => {
  const sql = 'DELETE FROM producto WHERE id_producto = ?';
  db.query(sql, [id], (err, results) => cb(err, results));
};

const proveedorExists = (idProveedor, cb) => {
  const sql = 'SELECT id_proveedor FROM proveedor WHERE id_proveedor = ? LIMIT 1';
  db.query(sql, [idProveedor], (err, results) => cb(err, !!(results && results.length)));
};

const categoriaExists = (idCategoria, cb) => {
  const sql = 'SELECT id_categoria FROM categoria WHERE id_categoria = ? LIMIT 1';
  db.query(sql, [idCategoria], (err, results) => cb(err, !!(results && results.length)));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
  proveedorExists,
  categoriaExists
};
