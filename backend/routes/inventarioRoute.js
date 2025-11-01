const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inventarioController');

// Definir las rutas
router.get('/', ctrl.obtenerMovimientos);
router.get('/:id', ctrl.obtenerMovimientoPorId);
router.post('/', ctrl.crearMovimiento);

module.exports = router;
