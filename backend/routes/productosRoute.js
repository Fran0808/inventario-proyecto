const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/productosController');

//Definir las rutas
router.get('/', ctrl.obtenerProductos);
router.get('/:id', ctrl.obtenerProductoPorId);
router.post('/', ctrl.crearProducto);
router.put('/:id', ctrl.actualizarProducto);
router.delete('/:id', ctrl.eliminarProducto);

module.exports = router;
