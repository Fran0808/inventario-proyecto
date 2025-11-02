// config/db.js
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventario',
  connectionLimit: 10
});

module.exports = pool; // pool.query(sql, params, cb)
