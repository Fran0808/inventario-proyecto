// routes/dashboardRoute.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/inicio/resumen', dashboardController.obtenerResumen);
router.get('/inicio/stock-bajo', dashboardController.obtenerProductosStockBajo);
router.get('/inicio/movimientos-recientes', dashboardController.obtenerMovimientosRecientes);

module.exports = router;
