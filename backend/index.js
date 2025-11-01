const express = require('express');
const cors = require('cors');

const productosRoutes = require('./routes/productosRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // para recibir JSON

// Rutas
app.use('/productos', productosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor backend funcionando correctamente');
});

// Iniciar servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Cerrar servidor ordenadamente en SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  console.log('Cerrando servidor...');
  server.close(() => process.exit(0));
});

// Exportar app (útil para tests)
module.exports = app;
