import Reserva from '../models/Reserva.js';
import Sala from '../models/sala.js';
import Usuario from '../models/Usuario.js';


export const getReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .populate('salaId', 'nombre capacidad estado') 
            .populate('usuarioId', 'nombre correo'); 
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las reservas.', error: error.message });
    }
};

// Crear una nueva reserva
export const createReservas = async (req, res) => {
    try {
        const { salaId, usuarioId, fechaInicio, fechaFin, estado } = req.body;

        // Validar campos requeridos
        if (!salaId || !usuarioId || !fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Los campos son obligatorios.' });
        }

        // Verificar si la sala existe
        const sala = await Sala.findById(salaId);
        if (!sala) {
            return res.status(404).json({ message: 'La sala no existe.' });
        }

        // Verificar si el usuario existe
        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'El usuario no existe.' });
        }

        // Crear la nueva reserva
        const nuevaReserva = new Reserva({
            salaId,
            usuarioId,
            fechaInicio,
            fechaFin,
            estado: estado || 'Activo',
        });

        await nuevaReserva.save();

        res.status(201).json({ message: 'Reserva creada exitosamente.', reserva: nuevaReserva });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva.', error: error.message });
    }
};

// Actualizar una reserva
export const updateReservas = async (req, res) => {
    try {
        const { id } = req.params;
        const { salaId, usuarioId, fechaInicio, fechaFin, estado } = req.body;

        // Buscar la reserva
        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        // Verificar si la sala existe
        if (salaId) {
            const sala = await Sala.findById(salaId);
            if (!sala) {
                return res.status(404).json({ message: 'La sala no existe.' });
            }
        }

        // Verificar si el usuario existe
        if (usuarioId) {
            const usuario = await Usuario.findById(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'El usuario no existe.' });
            }
        }

        // Actualizar los campos de la reserva
        reserva.salaId = salaId || reserva.salaId;
        reserva.usuarioId = usuarioId || reserva.usuarioId;
        reserva.fechaInicio = fechaInicio || reserva.fechaInicio;
        reserva.fechaFin = fechaFin || reserva.fechaFin;
        reserva.estado = estado || reserva.estado;

        await reserva.save();

        res.status(200).json({ message: 'Reserva actualizada exitosamente.', reserva });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la reserva.', error: error.message });
    }
};

// Eliminar una reserva
export const deleteReservas = async (req, res) => {
    try {
        const { id } = req.params;

        // Buscar y eliminar la reserva
        const reservaEliminada = await Reserva.findByIdAndDelete(id);
        if (!reservaEliminada) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        res.status(200).json({ message: 'Reserva eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reserva.', error: error.message });
    }
};
