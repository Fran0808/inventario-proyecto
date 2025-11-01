const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/proveedorController');

// Definir las rutas
router.get('/', ctrl.obtenerProveedores);
router.get('/:id', ctrl.obtenerProveedorPorId);
router.post('/', ctrl.crearProveedor);
router.put('/:id', ctrl.actualizarProveedor);
router.delete('/:id', ctrl.eliminarProveedor);

module.exports = router;
