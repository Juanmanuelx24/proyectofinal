import Sala from '../models/sala.js';

// Controlador para obtener todas las salas
export const getSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.json(salas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear una sala
export const createSala = async (req, res) => {
  const { nombre, capacidad, ubicacion } = req.body;
  try {
    const nuevaSala = new Sala({ nombre, capacidad, ubicacion });
    await nuevaSala.save();
    res.status(201).json({
      message: `Sala "${nuevaSala.nombre}" creada exitosamente.`,
      sala: nuevaSala,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para actualizar una sala
export const updateSala = async (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, ubicacion, estado } = req.body;
  try {
    const salaActualizada = await Sala.findByIdAndUpdate(
      id,
      { nombre, capacidad, ubicacion, estado },
      { new: true } // Devuelve la sala actualizada
    );
    if (!salaActualizada) {
      return res.status(404).json({ message: 'Sala no encontrada.' });
    }
    res.json({
      message: `Sala "${salaActualizada.nombre}" actualizada exitosamente.`,
      sala: salaActualizada,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controlador para eliminar una sala
export const deleteSala = async (req, res) => {
  const { id } = req.params;
  try {
    const salaEliminada = await Sala.findByIdAndDelete(id);
    if (!salaEliminada) {
      return res.status(404).json({ message: 'Sala no encontrada.' });
    }
    res.json({
      message: `Sala "${salaEliminada.nombre}" eliminada exitosamente.`,
      sala: salaEliminada,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
