-- =========================================
-- SCRIPT COMPLETO: Creación de datos de prueba (NO incluye Usuario)
-- NOTA: Ejecutar después de tablas.sql y asegurarse que existe Usuario con id_usuario = 1
-- Rango de movimientos: 2025-11-08 .. 2025-11-18
-- =========================================

SET FOREIGN_KEY_CHECKS = 0;

-- Categorías
INSERT INTO Categoria (id_categoria, nombre_categoria) VALUES
(1, 'Bebidas'),
(2, 'Alimentos enlatados'),
(3, 'Limpieza'),
(4, 'Papel y oficina'),
(5, 'Otros');

-- Proveedores
INSERT INTO Proveedor (id_proveedor, razon_social, telefono, activo) VALUES
(1, 'Distribuciones Norte S.A.', '01-2345678', 1),
(2, 'Bebidas del Valle S.R.L.', '01-9876543', 1),
(3, 'Comercial Sol y Mar', '01-5566778', 1),
(4, 'AgroAlimentos Perú S.A.', '01-4433221', 1),
(5, 'Papelera Andina', '01-6677889', 1),
(6, 'Empaques Perú S.A.', '01-3344556', 1),
(7, 'Importadora Global', '01-1122334', 1),
(8, 'Distribuciones Locales S.A.', '01-7788990',1);

-- Productos (IDs 1..31 — coincide con movimientos)
INSERT INTO Producto (id_producto, nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto) VALUES
(1,  'Agua mineral 500ml (pack 12)', 1, 2, 120, 12.00),
(2,  'Gaseosa cola 2L', 1, 2, 80, 6.50),
(3,  'Jugo de mango 1L', 1, 3, 60, 4.20),
(4,  'Cerveza lata 355ml (pack 24)', 1, 2, 40, 85.00),
(5,  'Arroz 5kg', 2, 4, 90, 18.50),
(6,  'Azúcar 2kg', 2, 4, 70, 6.00),
(7,  'Harina de trigo 1kg', 2, 4, 100, 3.20),
(8,  'Atún en lata 170g', 2, 3, 20, 3.80),
(9,  'Sopa instantánea (pack 12)', 2, 3, 12, 14.00),
(10, 'Frijoles en lata 400g', 2, 3, 75, 2.90),
(11, 'Detergente en polvo 5kg', 3, 1, 50, 28.00),
(12, 'Jabón líquido 3L', 3, 1, 40, 15.00),
(13, 'Lejía/blanqueador 1L', 3, 1, 60, 4.50),
(14, 'Desinfectante multiuso 1L', 3, 1, 55, 7.20),
(15, 'Escoba industrial', 3, 5, 35, 9.00),
(16, 'Galletas integrales 400g', 2, 4, 80, 7.50),
(17, 'Chocolate 100g', 2, 3, 10, 5.50),
(18, 'Café soluble 200g', 1, 3, 20, 12.00),
(19, 'Refresco de naranja 1L', 1, 2, 18, 6.00),
(20, 'Papel higiénico (pack 12)', 4, 5, 140, 22.00),
(21, 'Toallas de papel (paquete)', 4, 5, 90, 8.50),
(22, 'Hojas A4 paquete 500', 4, 5, 60, 25.00),
(23, 'Etiquetas adhesivas (pack 100)', 4, 5, 110, 6.00),
(24, 'Guantes de trabajo nitrilo (caja 100)', 3, 7, 45, 35.00),
(25, 'Aceite comestible 5L', 2, 4, 65, 40.00),
(26, 'Mayonesa industrial 3kg', 2, 3, 30, 28.50),
(27, 'Vino tinto 750ml (botella) - Bodega', 1, 2, 80, 45.00),
(28, 'Cerveza artesanal 330ml (pack 12) - Bodega', 1, 2, 60, 72.00),
(29, 'Aceitunas en frasco 1kg - Bodega', 2, 3, 40, 28.00),
(30, 'Conserva de pavo 400g - Bodega', 2, 4, 50, 12.50),
(31, 'Whisky 700ml (marca bodega)', 1, 7, 15, 120.00);

-- Movimientos (2025-11-08 a 2025-11-18) — variados por día y horario
INSERT INTO Movimientos (id_producto, id_usuario, tipo_movimiento, fecha_movimiento, cantidad, nota) VALUES

-- 2025-11-08
(1, 1, 'ENTRADA', '2025-11-08 08:20:00', 35, 'Llegada agua mineral mañana'),
(5, 1, 'ENTRADA', '2025-11-08 09:05:00', 45, 'Reposición arroz lote A'),
(8, 1, 'SALIDA', '2025-11-08 11:40:00', 10, 'Venta atún a tienda local'),
(10,1, 'SALIDA', '2025-11-08 14:10:00', 18, 'Venta frijoles a minorista'),
(18,1, 'SALIDA', '2025-11-08 16:25:00', 6, 'Venta café consumo rápido'),
(20,1, 'ENTRADA', '2025-11-08 17:30:00', 50, 'Ingreso gran lote papel higiénico'),

-- 2025-11-09
(3,  1, 'ENTRADA', '2025-11-09 08:15:00', 28, 'Ingreso jugo mango proveedor B'),
(6,  1, 'SALIDA',  '2025-11-09 10:00:00', 15, 'Venta azúcar por mayor'),
(11, 1, 'ENTRADA', '2025-11-09 13:00:00', 20, 'Reposición detergente'),
(20, 1, 'SALIDA',  '2025-11-09 15:20:00', 14, 'Venta pack papel a supermercado'),
(16, 1, 'SALIDA',  '2025-11-09 17:10:00', 9, 'Venta galletas desayuno'),
(29, 1, 'ENTRADA', '2025-11-09 18:45:00', 12, 'Llegada aceitunas para bodega'),

-- 2025-11-10
(9,  1, 'ENTRADA', '2025-11-10 09:00:00', 25, 'Ingreso sopa instantánea lote C'),
(7,  1, 'SALIDA',  '2025-11-10 11:00:00', 16, 'Venta harina a panadería'),
(24, 1, 'ENTRADA', '2025-11-10 14:10:00', 18, 'Compra guantes nitrilo'),
(15, 1, 'SALIDA',  '2025-11-10 16:40:00', 10, 'Venta escobas servicio limpieza'),
(17, 1, 'ENTRADA', '2025-11-10 17:55:00', 12, 'Ingreso chocolate promoción'),

-- 2025-11-11
(4,  1, 'ENTRADA', '2025-11-11 08:55:00', 48, 'Carga cerveza lata promocional'),
(4,  1, 'SALIDA',  '2025-11-11 12:10:00', 22, 'Venta packs cerveza a evento'),
(25, 1, 'ENTRADA', '2025-11-11 13:20:00', 22, 'Ingreso aceite comestible'),
(26, 1, 'ENTRADA', '2025-11-11 15:25:00', 14, 'Reposición mayonesa industrial'),
(2,  1, 'SALIDA',  '2025-11-11 16:30:00', 12, 'Venta gaseosas varias'),
(31, 1, 'SALIDA',  '2025-11-11 19:10:00', 3, 'Venta whisky por unidad a cliente'),

-- 2025-11-12
(12, 1, 'ENTRADA', '2025-11-12 08:10:00', 20, 'Ingreso jabón líquido'),
(13, 1, 'SALIDA',  '2025-11-12 10:05:00', 12, 'Venta lejía a limpiadora'),
(23, 1, 'ENTRADA', '2025-11-12 11:55:00', 25, 'Ingreso etiquetas adhesivas'),
(21, 1, 'ENTRADA', '2025-11-12 13:45:00', 18, 'Ingreso toallas papel'),
(30, 1, 'SALIDA',  '2025-11-12 16:20:00', 14, 'Venta conserva pavo restaurante'),
(16, 1, 'SALIDA',  '2025-11-12 18:30:00', 7, 'Venta galletas tarde'),

-- 2025-11-13
(1, 1, 'ENTRADA', '2025-11-13 08:05:00', 50, 'Reposición agua mineral sucursal A'),
(8, 1, 'ENTRADA', '2025-11-13 09:40:00', 25, 'Ingreso atún lotes varios'),
(10,1, 'SALIDA', '2025-11-13 11:15:00', 20, 'Venta frijoles a cadena'),
(19,1, 'SALIDA', '2025-11-13 13:30:00', 9,  'Venta refresco naranja'),
(27,1, 'ENTRADA', '2025-11-13 15:50:00', 20, 'Reposición vino bodega'),

-- 2025-11-14
(28,1, 'ENTRADA', '2025-11-14 08:20:00', 30, 'Llegada cerveza artesanal premium'),
(4, 1, 'SALIDA', '2025-11-14 10:05:00', 26, 'Venta cerveza a supermercado local'),
(25,1, 'SALIDA', '2025-11-14 12:30:00', 8,  'Venta aceite por mayor'),
(26,1, 'SALIDA', '2025-11-14 14:40:00', 10, 'Venta mayonesa a restaurante'),
(24,1, 'SALIDA', '2025-11-14 17:00:00', 6,  'Venta guantes trabajo'),

-- 2025-11-15
(2, 1, 'ENTRADA', '2025-11-15 08:10:00', 40, 'Reposición gaseosa cola lote especial'),
(17,1, 'SALIDA', '2025-11-15 09:45:00', 6,  'Venta chocolate desayuno'),
(22,1, 'SALIDA', '2025-11-15 11:30:00', 10, 'Venta hojas A4 oficina'),
(11,1, 'SALIDA', '2025-11-15 14:00:00', 12, 'Venta detergente a copistería'),
(5, 1, 'ENTRADA', '2025-11-15 16:20:00', 30, 'Ingreso arroz lote B'),

-- 2025-11-16
(3, 1, 'SALIDA', '2025-11-16 08:30:00', 22, 'Venta jugo a quiosco'),
(6, 1, 'ENTRADA', '2025-11-16 10:15:00', 30, 'Ingreso azúcar para promoción'),
(9, 1, 'SALIDA', '2025-11-16 12:40:00', 8,  'Venta sopa a tienda'),
(21,1, 'SALIDA', '2025-11-16 15:00:00', 12, 'Venta toallas a cafetería'),
(29,1, 'SALIDA', '2025-11-16 18:20:00', 10, 'Venta aceitunas a restaurante'),

-- 2025-11-17
(14,1, 'ENTRADA', '2025-11-17 08:50:00', 30, 'Ingreso desinfectante multiuso'),
(13,1, 'ENTRADA', '2025-11-17 10:00:00', 25, 'Ingreso lejía/precio especial'),
(26,1, 'SALIDA', '2025-11-17 12:05:00', 9,  'Venta mayonesa a tienda'),
(1, 1, 'SALIDA', '2025-11-17 14:30:00', 20, 'Venta agua pack clientes'),
(31,1, 'ENTRADA', '2025-11-17 17:00:00', 5,  'Pequeña compra whisky para bodega');

SET FOREIGN_KEY_CHECKS = 1;

-- FIN SCRIPT