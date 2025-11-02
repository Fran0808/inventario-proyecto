--Script para pegar en el query de la base de datos
-- Tabla: Categoria
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Tabla: Proveedor
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(100) NOT NULL,
    telefono VARCHAR(100),
    activo BOOLEAN NOT NULL
);

-- Tabla: Producto
CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(100) NOT NULL,
    id_categoria INT NOT NULL,
    id_proveedor INT NOT NULL,
    stock_producto INT NOT NULL,
    precio_producto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

-- Tabla: Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Tabla: Movimientos
CREATE TABLE Movimientos (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimiento ENUM('ENTRADA', 'SALIDA') NOT NULL,
    fecha_movimiento DATETIME NOT NULL,
    cantidad INT NOT NULL,
    nota VARCHAR(200),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);


-- Insercciones en las tablas para pruebas
-- Usuario administrador (un único registro)
-- En la terminal ejecutar el archivo crearUsuario con: node scripts/crearUsuario.js solo una vez

--Desactivar temporalmente las comprobaciones de FK para permitir inserciones con IDs explícitos
SET FOREIGN_KEY_CHECKS = 0;

-- Categorías (6)
INSERT INTO Categoria (id_categoria, nombre_categoria) VALUES
(1, 'Bebidas'),
(2, 'Alimentos enlatados'),
(3, 'Limpieza'),
(4, 'Ferretería'),
(5, 'Papel y oficina'),
(6, 'Empaques y embalaje');

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

-- Productos (35) -- referencia coherente a categoria y proveedor
-- Formato: nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto
INSERT INTO Producto (nombre_producto, id_categoria, id_proveedor, stock_producto, precio_producto) VALUES
('Agua mineral 500ml (pack 12)', 1, 2, 120, 12.00),
('Gaseosa cola 2L', 1, 2, 80, 6.50),
('Jugo de mango 1L', 1, 3, 60, 4.20),
('Cerveza lata 355ml (pack 24)', 1, 2, 40, 85.00),
('Arroz 5kg', 2, 4, 90, 18.50),
('Azúcar 2kg', 2, 4, 70, 6.00),
('Harina de trigo 1kg', 2, 4, 100, 3.20),
('Atún en lata 170g', 2, 3, 150, 3.80),
('Sopa instantánea (pack 12)', 2, 3, 110, 14.00),
('Frijoles en lata 400g', 2, 3, 75, 2.90),
('Detergente en polvo 5kg', 3, 1, 50, 28.00),
('Jabón líquido 3L', 3, 1, 40, 15.00),
('Lejía/blanqueador 1L', 3, 1, 60, 4.50),
('Desinfectante multiuso 1L', 3, 1, 55, 7.20),
('Escoba industrial', 3, 5, 35, 9.00),
('Martillo 16oz', 4, 5, 45, 12.50),
('Juego de destornilladores (6 piezas)', 4, 5, 30, 18.00),
('Clavos 1kg', 4, 5, 120, 6.50),
('Tornillos surtidos 200pz', 4, 5, 80, 22.00),
('Cinta adhesiva ancha 48mm (rollo)', 6, 7, 200, 1.80),
('Cajas de cartón corrugado (mediana) x50', 6, 7, 40, 120.00),
('Film stretch 1kg', 6, 7, 70, 45.00),
('Cinta masking 24mm (rollo)', 6, 7, 160, 1.50),
('Papel higiénico (pack 12)', 5, 6, 140, 22.00),
('Toallas de papel (paquete)', 5, 6, 90, 8.50),
('Hojas A4 paquete 500', 5, 6, 60, 25.00),
('Etiquetas adhesivas (pack 100)', 5, 6, 110, 6.00),
('Sacos plásticos para basura 50u', 6, 7, 130, 10.00),
('Guantes de trabajo nitrilo (caja 100)', 3, 8, 45, 35.00),
('Aceite comestible 5L', 2, 4, 65, 40.00),
('Mayonesa industrial 3kg', 2, 3, 30, 28.50),
('Papel film alimentario 30cm x300m', 6, 7, 90, 9.00),
('Bolsas zip 100u (medianas)', 6, 7, 150, 5.50),
('Palets plásticos (unidad)', 6, 8, 20, 220.00);

-- Reactivar comprobaciones de FK
SET FOREIGN_KEY_CHECKS = 1;
