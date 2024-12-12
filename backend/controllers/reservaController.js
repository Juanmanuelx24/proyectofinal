import Reserva from '../models/Reserva.js';
import Sala from '../models/sala.js';
import Usuario from '../models/Usuario.js';

// Función para verificar si hay solapamientos de reserva
const checkOverlap = async (salaId, fechaInicio, fechaFin) => {
  const overlappingReservations = await Reserva.find({
    salaId,
    $or: [
      {
        fechaInicio: { $lt: fechaFin }, // Si la nueva reserva empieza antes de que termine la existente
        fechaFin: { $gt: fechaInicio }, // Y si la nueva reserva termina después de que empiece la existente
      },
    ],
  });

  return overlappingReservations.length === 0;
};

export const getReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find()
      .populate('salaId', 'nombre capacidad ubicacion')
      .populate('usuarioId', 'nombre correo');
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReserva = async (req, res) => {
  const { salaId, usuarioId, fechaInicio, fechaFin } = req.body;

  try {
    const sala = await Sala.findById(salaId);
    if (!sala) return res.status(404).json({ message: 'Sala no encontrada.' });

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado.' });

    // Validar si la sala está disponible en las fechas solicitadas
    const isAvailable = await checkOverlap(salaId, fechaInicio, fechaFin);
    if (!isAvailable) {
      return res.status(400).json({ message: 'La sala ya está reservada para ese horario.' });
    }

    const nuevaReserva = new Reserva({
      salaId,
      usuarioId,
      fechaInicio,
      fechaFin,
    });

    await nuevaReserva.save();
    res.status(201).json({
      message: 'Reserva creada exitosamente.',
      reserva: nuevaReserva,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateReserva = async (req, res) => {
  const { id } = req.params;
  const { fechaInicio, fechaFin, estado } = req.body;

  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(
      id,
      { fechaInicio, fechaFin, estado },
      { new: true }
    ).populate('salaId', 'nombre')
     .populate('usuarioId', 'nombre correo');

    if (!reservaActualizada) {
      return res.status(404).json({ message: 'Reserva no encontrada.' });
    }

    res.json({
      message: 'Reserva actualizada exitosamente.',
      reserva: reservaActualizada,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReserva = async (req, res) => {
  const { id } = req.params;

  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: 'Reserva no encontrada.' });
    }

    res.json({
      message: 'Reserva eliminada exitosamente.',
      reserva: reservaEliminada,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};