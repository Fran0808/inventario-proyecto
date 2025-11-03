// models/inventarioModel.js
const db = require('../config/db');

const getAll = (cb) => {
  const sql = `
    SELECT m.id_movimiento, m.id_producto, p.nombre_producto, m.id_usuario, u.nombre_usuario,
           m.tipo_movimiento, m.fecha_movimiento, m.cantidad, m.nota
    FROM movimientos m
    JOIN producto p ON m.id_producto = p.id_producto
    JOIN usuario u ON m.id_usuario = u.id_usuario
    ORDER BY m.fecha_movimiento DESC
  `;
  db.query(sql, (err, results) => cb(err, results));
};

const getById = (id, cb) => {
  const sql = `
    SELECT m.id_movimiento, m.id_producto, p.nombre_producto, m.id_usuario, u.nombre_usuario,
           m.tipo_movimiento, m.fecha_movimiento, m.cantidad, m.nota
    FROM movimientos m
    JOIN producto p ON m.id_producto = p.id_producto
    JOIN usuario u ON m.id_usuario = u.id_usuario
    WHERE m.id_movimiento = ?
  `;
  db.query(sql, [id], (err, results) => cb(err, results && results[0]));
};

const create = (movimiento, cb) => {
  const { id_producto, id_usuario, tipo_movimiento, cantidad, nota } = movimiento;
  const qty = Number(cantidad);
  if (!['ENTRADA', 'SALIDA'].includes(tipo_movimiento)) return cb(new Error('Tipo de movimiento inválido'));

  db.getConnection((err, connection) => {
    if (err) return cb(err);
    connection.beginTransaction((err) => {
      if (err) { connection.release(); return cb(err); }

      // Se encarga de bloquear y obtener stock de los producto
      const sqlSelectProd = 'SELECT stock_producto FROM producto WHERE id_producto = ? FOR UPDATE';
      connection.query(sqlSelectProd, [id_producto], (err, rowsProd) => {
        if (err) return connection.rollback(() => { connection.release(); cb(err); });
        if (!rowsProd || rowsProd.length === 0) {
          return connection.rollback(() => { connection.release(); cb(new Error('Producto no encontrado')); });
        }
        const currentStock = Number(rowsProd[0].stock_producto);

        //Se encarga de verificar la existencia del usuario
        const sqlSelectUser = 'SELECT id_usuario FROM usuario WHERE id_usuario = ? LIMIT 1';
        connection.query(sqlSelectUser, [id_usuario], (err, rowsUser) => {
          if (err) return connection.rollback(() => { connection.release(); cb(err); });
          if (!rowsUser || rowsUser.length === 0) {
            return connection.rollback(() => { connection.release(); cb(new Error('Usuario no encontrado')); });
          }

          // Se encarga de validar el stock si es SALIDA
          if (tipo_movimiento === 'SALIDA' && qty > currentStock) {
            return connection.rollback(() => { connection.release(); cb(new Error('Stock insuficiente')); });
          }

          // Inserta el movimiento
          const sqlInsert = `
            INSERT INTO movimientos (id_producto, id_usuario, tipo_movimiento, fecha_movimiento, cantidad, nota)
            VALUES (?, ?, ?, NOW(), ?, ?)
          `;
          connection.query(sqlInsert, [id_producto, id_usuario, tipo_movimiento, qty, nota], (err, resultInsert) => {
            if (err) return connection.rollback(() => { connection.release(); cb(err); });

            // Actualiza el stock
            const operador = tipo_movimiento === 'ENTRADA' ? '+' : '-';
            const sqlUpdateStock = `UPDATE producto SET stock_producto = stock_producto ${operador} ? WHERE id_producto = ?`;
            connection.query(sqlUpdateStock, [qty, id_producto], (err) => {
              if (err) return connection.rollback(() => { connection.release(); cb(err); });

              // Registra el movimineto
              connection.commit((err) => {
                if (err) return connection.rollback(() => { connection.release(); cb(err); });
                connection.release();
                cb(null, { message: 'Movimiento registrado', id_movimiento: resultInsert.insertId });
              });
            });
          });
        });
      });
    });
  });
};

const getBetween = (desde, hasta, cb) => {
  const sql = `
    SELECT m.*, p.nombre_producto, u.nombre_usuario
    FROM Movimientos m
    JOIN Producto p ON m.id_producto = p.id_producto
    JOIN Usuario u ON m.id_usuario = u.id_usuario
    WHERE m.fecha_movimiento BETWEEN ? AND ?
    ORDER BY m.fecha_movimiento DESC
  `;
  db.query(sql, [desde, hasta], (err, results) => cb(err, results));
};

module.exports = {
  getAll,
  getById,
  create,
  getBetween
};
