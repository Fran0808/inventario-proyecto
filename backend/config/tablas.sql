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


--Insercciones en las tablas para pruebas

INSERT INTO Usuario (rol, nombre_usuario, contraseña)
VALUES ('admin', 'admin', 'admin');
