// scripts/crearUsuario.js
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';

const DB_CONFIG = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventario',
};

// === CONFIGURA AQUÍ ===
const NUEVO_USUARIO = 'Juan';
const NUEVA_CONTRASENA = 'contraseña';
const NUEVO_ROL = 'Administrador';
// ======================

(async () => {
  try {
    const conn = await mysql.createConnection(DB_CONFIG);    

    await conn.execute('DELETE FROM Usuario');
    await conn.execute('ALTER TABLE Usuario AUTO_INCREMENT = 1');

    const hash = await bcrypt.hash(NUEVA_CONTRASENA, 10);
    await conn.execute(
      'INSERT INTO Usuario (rol, nombre_usuario, contraseña) VALUES (?, ?, ?)',
      [NUEVO_ROL, NUEVO_USUARIO, hash]
    );

    console.log(`Usuario "${NUEVO_USUARIO}" creado correctamente.`);
    await conn.end();
  } catch (err) {
    console.error('Error al crear el usuario:', err);
  }
})();
