const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/inventarioController');

router.get('/', ctrl.obtenerMovimientos);
router.get('/filtrar', ctrl.filtrarMovimientosPorFechas);
router.get('/:id', ctrl.obtenerMovimientoPorId);
router.post('/', ctrl.crearMovimiento);

module.exports = router;
