const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const productosRoutes = require('./routes/productosRoute');

// Usar las rutas
app.use('/productos', productosRoutes);

// Ruta base opcional
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
