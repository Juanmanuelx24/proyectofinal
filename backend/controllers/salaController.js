import mongoose from 'mongoose';
import Sala from '../models/sala.js';

export const getSalas = async (req, res) => {
  try {
    const salas = await Sala.find();
    res.json(salas);
  } catch (error) {
    console.error('Error en getSalas:', error.message);
    res.status(500).json({ message: 'Error al obtener las salas.' });
  }
};

export const createSala = async (req, res) => {
  const { nombre, capacidad, ubicacion } = req.body;
  if (!nombre || !ubicacion || capacidad < 1) {
    return res.status(400).json({ message: 'Datos inválidos o incompletos.' });
  }
  try {
    const nuevaSala = new Sala({ nombre, capacidad, ubicacion });
    await nuevaSala.save();
    res.status(201).json({
      message: `Sala "${nuevaSala.nombre}" creada exitosamente.`,
      sala: nuevaSala,
    });
  } catch (error) {
    console.error('Error en createSala:', error.message);
    res.status(400).json({ message: 'Error al crear la sala.', error: error.message });
  }
};

export const updateSala = async (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, ubicacion, estado } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de sala no válido.' });
  }

  if (!nombre || !ubicacion || capacidad < 1) {
    return res.status(400).json({ message: 'Datos inválidos o incompletos.' });
  }

  try {
    const salaActualizada = await Sala.findByIdAndUpdate(
      id,
      { nombre, capacidad, ubicacion, estado },
      { new: true }
    );
    if (!salaActualizada) {
      return res.status(404).json({ message: 'Sala no encontrada.' });
    }
    res.json({
      message: `Sala "${salaActualizada.nombre}" actualizada exitosamente.`,
      sala: salaActualizada,
    });
  } catch (error) {
    console.error('Error en updateSala:', error.message);
    res.status(400).json({ message: 'Error al actualizar la sala.', error: error.message });
  }
};

export const deleteSala = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'ID de sala no válido.' });
  }

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
    console.error('Error en deleteSala:', error.message);
    res.status(400).json({ message: 'Error al eliminar la sala.', error: error.message });
  }
};
