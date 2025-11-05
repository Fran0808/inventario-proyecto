// routes/dashboardRoute.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/inicio/resumen', dashboardController.obtenerResumen);
router.get('/inicio/stock-bajo', dashboardController.obtenerProductosStockBajo);
router.get('/inicio/movimientos-recientes', dashboardController.obtenerMovimientosRecientes);

// nuevas rutas para gráfico
router.get('/inicio/movimientos-7d', dashboardController.obtenerMovimientos7Dias);
// flexible: /api/dashboard/inicio/movimientos?days=7&metric=sum
router.get('/inicio/movimientos', dashboardController.obtenerMovimientosNDias);

module.exports = router;
