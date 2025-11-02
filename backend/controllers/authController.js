// controllers/authController.js
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt'); //npm install bcrypt

const dbConfig = { host: 'localhost', user: 'root', password: '', database: 'inventario' };

exports.login = async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  if (!nombre_usuario || !contraseña) return res.status(400).json({ message: 'Faltan nombre_usuario o contraseña' });

  let conn;
  try {
    conn = await mysql.createConnection(dbConfig);
    const [rows] = await conn.execute('SELECT * FROM Usuario WHERE nombre_usuario = ?', [nombre_usuario]);    

    if (!rows || rows.length === 0) {
      await conn.end();
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const usuario = rows[0];
    const validPassword = await bcrypt.compare(contraseña, usuario.contraseña);
    await conn.end();

    if (!validPassword) return res.status(401).json({ message: 'Contraseña incorrecta' });

    return res.json({
      message: 'Inicio de sesión exitoso',
      usuario: {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    if (conn) await conn.end().catch(()=>{});
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error del servidor' });
  }
};
