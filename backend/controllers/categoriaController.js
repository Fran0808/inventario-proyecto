// controllers/categoriaController.js
const categoriaModel = require('../models/categoriaModel');

const validarCategoriaBody = (body) => {
  const { nombre_categoria } = body;
  if (!nombre_categoria || typeof nombre_categoria !== 'string') return 'Nombre de categoría inválido';
  return null;
};

const obtenerCategorias = (req, res) => {
  categoriaModel.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

const obtenerCategoriaPorId = (req, res) => {
  const { id } = req.params;
  categoriaModel.getById(id, (err, categoria) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!categoria) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(categoria);
  });
};

const crearCategoria = (req, res) => {
  const errorValid = validarCategoriaBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  categoriaModel.create(req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Categoría creada', id_categoria: result.insertId });
  });
};

const actualizarCategoria = (req, res) => {
  const { id } = req.params;
  const errorValid = validarCategoriaBody(req.body);
  if (errorValid) return res.status(400).json({ error: errorValid });

  categoriaModel.updateById(id, req.body, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría actualizada' });
  });
};

const eliminarCategoria = (req, res) => {
  const { id } = req.params;
  categoriaModel.deleteById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json({ message: 'Categoría eliminada' });
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
