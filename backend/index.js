const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());


// Logger simple para depuración, cada petición que llegue al servidor se imprime en la consola antes de pasar a las rutas correspondientes
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});


// Importar rutas
const productosRoute = require('./routes/productosRoute');
const proveedorRoute = require('./routes/proveedorRoute');


// Usar las rutas
app.use('/productos', productosRoute);
app.use('/proveedores', proveedorRoute);


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
