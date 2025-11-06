-- =========================================
-- SCRIPT: Creación de tablas
-- =========================================

-- Desactivar comprobaciones FK temporalmente para evitar errores al eliminar
SET FOREIGN_KEY_CHECKS = 0;

-- Eliminar tablas si existen (orden: más dependientes primero)
DROP TABLE IF EXISTS Movimientos;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Usuario;
DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Proveedor;

-- Crear tabla: Categoria
CREATE TABLE Categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre_categoria VARCHAR(100) NOT NULL
);

-- Crear tabla: Proveedor
CREATE TABLE Proveedor (
    id_proveedor INT AUTO_INCREMENT PRIMARY KEY,
    razon_social VARCHAR(100) NOT NULL,
    telefono VARCHAR(100),
    activo BOOLEAN NOT NULL
);

-- Crear tabla: Producto
CREATE TABLE Producto (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre_producto VARCHAR(150) NOT NULL,
    id_categoria INT NOT NULL,
    id_proveedor INT NOT NULL,
    stock_producto INT NOT NULL,
    precio_producto DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria),
    FOREIGN KEY (id_proveedor) REFERENCES Proveedor(id_proveedor)
);

-- Crear tabla: Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(100) NOT NULL,
    nombre_usuario VARCHAR(100) NOT NULL,
    contraseña VARCHAR(255) NOT NULL
);

-- Crear tabla: Movimientos
CREATE TABLE Movimientos (
    id_movimiento INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT NOT NULL,
    id_usuario INT NOT NULL,
    tipo_movimiento ENUM('ENTRADA', 'SALIDA') NOT NULL,
    fecha_movimiento DATETIME NOT NULL,
    cantidad INT NOT NULL,
    nota VARCHAR(255),
    FOREIGN KEY (id_producto) REFERENCES Producto(id_producto),
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Reactivar comprobaciones FK
SET FOREIGN_KEY_CHECKS = 1;

-- FIN tablas.sql
