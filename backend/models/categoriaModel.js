// models/categoriassModel.js
const db = require('../config/db');

const getAll = (cb) => {
  const sql = 'SELECT * FROM categoria';
  db.query(sql, (err, results) => cb(err, results));
};

const getById = (id, cb) => {
  const sql = 'SELECT * FROM categoria WHERE id_categoria = ?';
  db.query(sql, [id], (err, results) => cb(err, results && results[0]));
};

const create = (categoria, cb) => {
  const { nombre_categoria } = categoria;
  const sql = 'INSERT INTO categoria (nombre_categoria) VALUES (?)';
  db.query(sql, [nombre_categoria], (err, results) => cb(err, results));
};

const updateById = (id, categoria, cb) => {
  const { nombre_categoria } = categoria;
  const sql = 'UPDATE categoria SET nombre_categoria = ? WHERE id_categoria = ?';
  db.query(sql, [nombre_categoria, id], (err, results) => cb(err, results));
};

const deleteById = (id, cb) => {
  const sql = 'DELETE FROM categoria WHERE id_categoria = ?';
  db.query(sql, [id], (err, results) => cb(err, results));
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};
