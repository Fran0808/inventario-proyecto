const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

(async () => {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'inventario',
  });

  // Borra todos los usuarios y reinicia IDs
  await conn.execute('DELETE FROM Usuario');
  await conn.execute('ALTER TABLE Usuario AUTO_INCREMENT = 1');

  // Crea un nuevo usuario
  const hash = await bcrypt.hash('1234', 10);
  await conn.execute(
    'INSERT INTO Usuario (rol, nombre_usuario, contraseña) VALUES (?, ?, ?)',
    ['admin', 'Juan', hash]
  );

  console.log('Usuario creado');
  await conn.end();
})();
