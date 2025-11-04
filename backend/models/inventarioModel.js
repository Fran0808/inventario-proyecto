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

const updateById = (id, movimiento, cb) => {
  const { id_producto, id_usuario, tipo_movimiento, cantidad, nota, fecha_movimiento } = movimiento;
  const qty = Number(cantidad);

  db.getConnection((err, connection) => {
    if (err) return cb(err);

    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return cb(err);
      }


      const q = (sql, params = []) =>
        new Promise((resolve, reject) => {
          connection.query(sql, params, (err, rows) => (err ? reject(err) : resolve(rows)));
        });

      (async () => {
        try {

          const rowsMov = await q('SELECT * FROM movimientos WHERE id_movimiento = ?', [id]);
          if (!rowsMov || rowsMov.length === 0) {
            throw new Error('Movimiento no encontrado');
          }
          const movAntiguo = rowsMov[0];

          const signoAntiguo = movAntiguo.tipo_movimiento === 'ENTRADA' ? -1 : 1;
          await q('UPDATE producto SET stock_producto = stock_producto + ? WHERE id_producto = ?', [
            signoAntiguo * Number(movAntiguo.cantidad),
            movAntiguo.id_producto,
          ]);

          const rowsProd = await q('SELECT stock_producto FROM producto WHERE id_producto = ? FOR UPDATE', [id_producto]);
          if (!rowsProd || rowsProd.length === 0) {
            throw new Error('Producto no encontrado');
          }
          const stockActualDestino = Number(rowsProd[0].stock_producto);

          if (tipo_movimiento === 'SALIDA' && qty > stockActualDestino) {
            throw new Error('Stock insuficiente para el nuevo movimiento');
          }

          const fechaToUse = fecha_movimiento ? fecha_movimiento : null;
          if (fechaToUse) {
            await q(
              'UPDATE movimientos SET id_producto = ?, id_usuario = ?, tipo_movimiento = ?, cantidad = ?, nota = ?, fecha_movimiento = ? WHERE id_movimiento = ?',
              [id_producto, id_usuario, tipo_movimiento, qty, nota, fechaToUse, id]
            );
          } else {
            await q(
              'UPDATE movimientos SET id_producto = ?, id_usuario = ?, tipo_movimiento = ?, cantidad = ?, nota = ?, fecha_movimiento = NOW() WHERE id_movimiento = ?',
              [id_producto, id_usuario, tipo_movimiento, qty, nota, id]
            );
          }

          const signoNuevo = tipo_movimiento === 'ENTRADA' ? 1 : -1;
          await q('UPDATE producto SET stock_producto = stock_producto + ? WHERE id_producto = ?', [
            signoNuevo * qty,
            id_producto,
          ]);

          connection.commit((err) => {
            connection.release();
            if (err) return cb(err);
            cb(null, { message: 'Movimiento y stock actualizados correctamente' });
          });
        } catch (error) {
          return connection.rollback(() => {
            connection.release();
            cb(error);
          });
        }
      })();
    });
  });
};


const deleteById = (id, cb) => {
  const sqlSelect = 'SELECT id_producto, tipo_movimiento, cantidad FROM movimientos WHERE id_movimiento = ?';
  db.query(sqlSelect, [id], (err, rows) => {
    if (err) return cb(err);
    if (rows.length === 0) return cb(new Error('Movimiento no encontrado'));

    const mov = rows[0];
    const qty = Number(mov.cantidad);
    const signo = mov.tipo_movimiento === 'ENTRADA' ? -1 : 1;

    const sqlUpdate = 'UPDATE producto SET stock_producto = stock_producto + ? WHERE id_producto = ?';
    db.query(sqlUpdate, [signo * qty, mov.id_producto], (err2) => {
      if (err2) return cb(err2);

      const sqlDelete = 'DELETE FROM movimientos WHERE id_movimiento = ?';
      db.query(sqlDelete, [id], (err3, result) => cb(err3, result));
    });
  });
};

module.exports = {
  getAll,
  getById,
  create,
  getBetween,
  updateById,   
  deleteById 
};

