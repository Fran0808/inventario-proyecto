-- SCRIPT: insertar datos base y movimientos (NO incluye Usuario)
-- IMPORTANTE: Ejecutar después de tablas.sql y de crear el usuario con el script crearUsuario.js
-- Fecha de referencia en movimientos: 2025-10-30 .. 2025-11-03

-- Desactivar comprobaciones FK temporalmente para permitir inserciones con ids explícitos
SET FOREIGN_KEY_CHECKS = 0;

-- Categorías (5)
INSERT INTO Categoria (id_categoria, nombre_categoria) VALUES
(1, 'Bebidas'),
(2, 'Alimentos enlatados'),
(3, 'Limpieza'),
(4, 'Ferretería'),
(5, 'Papel y oficina');

-- Proveedores (8)
INSERT INTO Proveedor (id_proveedor, razon_social, telefono, activo) VALUES
(1, 'Distribuciones Norte S.A.', '01-2345678', 1),
(2, 'Bebidas del Valle S.R.L.', '01-9876543', 1),
(3, 'Comercial Sol y Mar', '01-5566778', 1),
(4, 'AgroAlimentos Perú S.A.', '01-4433221', 1),
(5, 'Ferretería Central', '01-7788990', 1),
(6, 'Papelera Andina', '01-6677889', 1),
(7, 'Empaques Perú S.A.', '01-3344556', 1),
(8, 'Importadora Global', '01-1122334', 1);

-- Productos (con id_producto explícitos para mantener consistencia con Movimientos)
INSERT INTO Producto (id_producto, nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto) VALUES
(1,  'Agua mineral 500ml (pack 12)', 1, 2, 120, 12.00),
(2,  'Gaseosa cola 2L', 1, 2, 80, 6.50),
(3,  'Jugo de mango 1L', 1, 3, 60, 4.20),
(4,  'Cerveza lata 355ml (pack 24)', 1, 2, 40, 85.00),
(5,  'Arroz 5kg', 2, 4, 90, 18.50),
(6,  'Azúcar 2kg', 2, 4, 70, 6.00),
(7,  'Harina de trigo 1kg', 2, 4, 100, 3.20),
(8,  'Atún en lata 170g', 2, 3, 150, 3.80),
(9,  'Sopa instantánea (pack 12)', 2, 3, 110, 14.00),
(10, 'Frijoles en lata 400g', 2, 3, 75, 2.90),
(11, 'Detergente en polvo 5kg', 3, 1, 50, 28.00),
(12, 'Jabón líquido 3L', 3, 1, 40, 15.00),
(13, 'Lejía/blanqueador 1L', 3, 1, 60, 4.50),
(14, 'Desinfectante multiuso 1L', 3, 1, 55, 7.20),
(15, 'Escoba industrial', 3, 5, 35, 9.00),
(16, 'Martillo 16oz', 4, 5, 45, 12.50),
(17, 'Juego de destornilladores (6 piezas)', 4, 5, 30, 18.00),
(18, 'Clavos 1kg', 4, 5, 120, 6.50),
(19, 'Tornillos surtidos 200pz', 4, 5, 80, 22.00),
(20, 'Papel higiénico (pack 12)', 5, 6, 140, 22.00),
(21, 'Toallas de papel (paquete)', 5, 6, 90, 8.50),
(22, 'Hojas A4 paquete 500', 5, 6, 60, 25.00),
(23, 'Etiquetas adhesivas (pack 100)', 5, 6, 110, 6.00),
(24, 'Guantes de trabajo nitrilo (caja 100)', 3, 8, 45, 35.00),
(25, 'Aceite comestible 5L', 2, 4, 65, 40.00),
(26, 'Mayonesa industrial 3kg', 2, 3, 30, 28.50),
(27, 'Vino tinto 750ml (botella) - Bodega', 1, 2, 80, 45.00),
(28, 'Cerveza artesanal 330ml (pack 12) - Bodega', 1, 2, 60, 72.00),
(29, 'Aceitunas en frasco 1kg - Bodega', 2, 3, 40, 28.00),
(30, 'Conserva de pavo 400g - Bodega', 2, 4, 50, 12.50),
(31, 'Whisky 700ml (marca bodega)', 1, 8, 25, 120.00);

-- Movimientos: registros de ejemplo (fechas entre 2025-10-30 y 2025-11-03)
-- Nota: estos movimientos asumen que ya existe un Usuario con id_usuario = 1
INSERT INTO Movimientos (id_producto, id_usuario, tipo_movimiento, fecha_movimiento, cantidad, nota) VALUES
-- 2025-10-30
(27, 1, 'ENTRADA', '2025-10-30 09:10:00', 40, 'Recepción inicial vino tinto para bodega'),
(29, 1, 'ENTRADA', '2025-10-30 10:25:00', 20, 'Ingreso de aceitunas para bodega'),
(2,  1, 'SALIDA',  '2025-10-30 11:00:00', 10, 'Venta de gaseosa cola 2L'),
-- 2025-10-31
(28, 1, 'ENTRADA', '2025-10-31 08:50:00', 30, 'Llegada cerveza artesanal para bodega'),
(30, 1, 'ENTRADA', '2025-10-31 09:30:00', 25, 'Ingreso de conservas de pavo'),
(1,  1, 'SALIDA',  '2025-10-31 12:15:00', 15, 'Venta de agua mineral'),
(30, 1, 'ENTRADA', '2025-10-31 15:00:00', 10, 'Reposición conservas de pavo'),
-- 2025-11-01
(31, 1, 'ENTRADA', '2025-11-01 09:05:00', 15, 'Compra whisky para bodega'),
(27, 1, 'SALIDA',  '2025-11-01 11:45:00', 6,  'Venta de vino tinto a cliente mayorista'),
(8,  1, 'SALIDA',  '2025-11-01 13:20:00', 12, 'Venta de atún en lata'),
-- 2025-11-02
(28, 1, 'SALIDA',  '2025-11-02 10:10:00', 8,  'Venta pack cerveza artesanal'),
(29, 1, 'SALIDA',  '2025-11-02 11:30:00', 5,  'Venta de aceitunas a tienda local'),
(5,  1, 'SALIDA',  '2025-11-02 14:00:00', 10, 'Venta de arroz 5kg'),
(19, 1, 'SALIDA',  '2025-11-02 16:20:00', 10, 'Venta de tornillos surtidos'),
-- 2025-11-03 (fecha principal)
(27, 1, 'ENTRADA', '2025-11-03 09:15:00', 10, 'Reposición vino tinto bodega'),
(28, 1, 'ENTRADA', '2025-11-03 09:30:00', 20, 'Reposición cerveza artesanal'),
(30, 1, 'SALIDA',  '2025-11-03 10:05:00', 6,  'Venta de conserva de pavo'),
(31, 1, 'SALIDA',  '2025-11-03 11:00:00', 2,  'Venta de whisky por unidad'),
(29, 1, 'SALIDA',  '2025-11-03 12:30:00', 8,  'Venta de aceitunas a restaurante local'),
(1,  1, 'ENTRADA', '2025-11-03 13:10:00', 50, 'Reposición agua mineral'),
(11, 1, 'ENTRADA', '2025-11-03 13:35:00', 30, 'Compra detergente en polvo'),
(16, 1, 'SALIDA',  '2025-11-03 14:05:00', 5,  'Venta de martillo 16oz'),
(24, 1, 'SALIDA',  '2025-11-03 14:30:00', 4,  'Venta de guantes nitrilo'),
-- entradas/salidas adicionales para mayor volumen de prueba (2025-11-03)
(2, 1, 'SALIDA', '2025-11-03 15:20:00', 20, 'Venta de gaseosas en promoción'),
(8, 1, 'SALIDA', '2025-11-03 15:45:00', 30, 'Venta de atún a cadena local'),
(21,1, 'ENTRADA','2025-11-03 16:00:00', 10, 'Reposición toallas de papel'),
(22,1, 'SALIDA', '2025-11-03 16:20:00', 6, 'Venta de hojas A4 a oficina');


-- Movimientos adicionales (27/10/2025 - 03/11/2025)
INSERT INTO Movimientos (id_producto, id_usuario, tipo_movimiento, fecha_movimiento, cantidad, nota) VALUES
-- 2025-10-27
(1, 1, 'ENTRADA', '2025-10-27 08:30:00', 40, 'Recepción inicial agua mineral para local A'),
(5, 1, 'ENTRADA', '2025-10-27 09:10:00', 50, 'Ingreso arroz 5kg lote promocional'),
(8, 1, 'SALIDA',  '2025-10-27 11:45:00', 20, 'Venta atún en lata a tienda vecina'),
(18,1, 'SALIDA',  '2025-10-27 12:30:00', 30, 'Venta clavos 1kg a constructor local'),

-- 2025-10-28
(3, 1, 'ENTRADA', '2025-10-28 08:20:00', 25, 'Llegada jugo de mango 1L'),
(6, 1, 'SALIDA',  '2025-10-28 10:00:00', 15, 'Venta azúcar 2kg'),
(11,1, 'ENTRADA', '2025-10-28 13:15:00', 20, 'Reposición detergente en polvo'),
(20,1, 'SALIDA', '2025-10-28 15:40:00', 12, 'Venta pack papel higiénico'),

-- 2025-10-29
(9, 1, 'ENTRADA', '2025-10-29 09:00:00', 30, 'Ingreso sopa instantánea pack 12'),
(7, 1, 'SALIDA',  '2025-10-29 11:10:00', 25, 'Venta harina de trigo 1kg'),
(24,1, 'ENTRADA', '2025-10-29 14:00:00', 10, 'Compra guantes nitrilo para almacén'),
(16,1, 'SALIDA',  '2025-10-29 16:20:00', 7,  'Venta martillos a ferretería local'),

-- 2025-10-30 (más volumen ese día)
(4, 1, 'ENTRADA', '2025-10-30 08:45:00', 50, 'Recepción cerveza lata pack 24 promocional'),
(4, 1, 'SALIDA',  '2025-10-30 12:00:00', 18, 'Venta pack cerveza a cliente'),
(25,1, 'ENTRADA', '2025-10-30 13:00:00', 20, 'Ingreso aceite comestible 5L'),
(26,1, 'ENTRADA', '2025-10-30 15:30:00', 15, 'Llegada mayonesa industrial'),

-- 2025-10-31 (complementos)
(12,1, 'ENTRADA', '2025-10-31 08:30:00', 25, 'Reposición jabón líquido 3L'),
(13,1, 'SALIDA',  '2025-10-31 10:00:00', 12, 'Venta lejía/blanqueador 1L a limpiadora'),
(14,1, 'SALIDA',  '2025-10-31 14:20:00', 8,  'Venta desinfectante multiuso'),
(23,1, 'ENTRADA', '2025-10-31 16:45:00', 40, 'Ingreso etiquetas adhesivas'),

-- 2025-11-01 (más actividad previa)
(2, 1, 'ENTRADA', '2025-11-01 08:10:00', 30, 'Reposición gaseosa cola 2L'),
(10,1, 'SALIDA',  '2025-11-01 11:00:00', 20, 'Venta frijoles en lata'),
(15,1, 'ENTRADA', '2025-11-01 12:30:00', 15, 'Compra escobas industriales'),
(21,1, 'SALIDA',  '2025-11-01 17:00:00', 5,  'Venta toallas de papel a oficina'),

-- 2025-11-02 (complementario)
(17,1, 'ENTRADA', '2025-11-02 09:25:00', 20, 'Ingreso juego destornilladores'),
(19,1, 'ENTRADA', '2025-11-02 10:40:00', 30, 'Reposición tornillos surtidos'),
(22,1, 'ENTRADA', '2025-11-02 13:50:00', 20, 'Ingreso hojas A4 paquete 500'),
(31,1, 'ENTRADA', '2025-11-02 15:10:00', 10, 'Pequeña compra whisky bodega'),

-- 2025-11-03 (completando el día existente)
(6, 1, 'ENTRADA', '2025-11-03 08:50:00', 25, 'Reposición azúcar 2kg'),
(5, 1, 'ENTRADA', '2025-11-03 09:20:00', 20, 'Reposición arroz 5kg lote B'),
(8, 1, 'ENTRADA', '2025-11-03 10:45:00', 20, 'Reposición atún en lata'),
(9, 1, 'SALIDA',  '2025-11-03 17:00:00', 10, 'Venta sopa instantánea a minorista');
-- Reactivar comprobaciones FK
SET FOREIGN_KEY_CHECKS = 1;

-- FIN insercciones.sql
