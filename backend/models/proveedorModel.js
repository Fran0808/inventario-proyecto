//models/proveedorModel.js
const db = require("../config/db.js");

const getAll = (cb) => {
  const sql = "SELECT * FROM proveedor";
  db.query(sql, (err, results) => cb(err, results));
};

const getById = (id, cb) => {
  const sql = 'SELECT * FROM proveedor WHERE id_proveedor = ?';
  db.query(sql, [id], (err, results) => cb(err, results && results[0]));
};

const create = (proveedor, cb) => {
  const { razon_social, telefono, activo } = proveedor;
  const sql = 'INSERT INTO proveedor (razon_social, telefono, activo) VALUES (?, ?, ?)';
  db.query(sql, [razon_social, telefono, activo], (err, results) => cb(err, results));
};

const updateById = (id, proveedor, cb) => {
  const { razon_social, telefono, activo } = proveedor;
  const sql = 'UPDATE proveedor SET razon_social = ?, telefono = ?, activo = ? WHERE id_proveedor = ?';
  db.query(sql, [razon_social, telefono, activo, id], (err, results) => cb(err, results));
};

const deleteById = (id, cb) => {
  const sql = 'DELETE FROM proveedor WHERE id_proveedor = ?';
  db.query(sql, [id], (err, results) => cb(err, results));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};