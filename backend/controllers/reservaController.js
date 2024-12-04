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

export const createReservas = async (req, res) => {
    try {
        const { salaId, usuarioId, fechaInicio, fechaFin, estado } = req.body;
        console.log("Datos recibidos:", req.body);

        if (!salaId || !usuarioId || !fechaInicio || !fechaFin) {
            return res.status(400).json({ message: 'Los campos son obligatorios.' });
        }

        const sala = await Sala.findById(salaId);
        if (!sala) {
            return res.status(404).json({ message: 'La sala no existe.' });
        }

        const usuario = await Usuario.findById(usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'El usuario no existe.' });
        }

    
        if (new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin.' });
        }

       
        const estadoValido = ['Activo', 'Inactivo'];
        if (estado && !estadoValido.includes(estado)) {
            return res.status(400).json({ message: 'Estado inválido, debe ser "Activo" o "Inactivo".' });
        }

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
        console.error("Error en createReservas:", error); 
        res.status(500).json({ message: 'Error al crear la reserva.', error: error.message });
    }
};

export const updateReservas = async (req, res) => {
    try {
        const { id } = req.params;
        const { salaId, usuarioId, fechaInicio, fechaFin, estado } = req.body;

        const reserva = await Reserva.findById(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        if (salaId) {
            const sala = await Sala.findById(salaId);
            if (!sala) {
                return res.status(404).json({ message: 'La sala no existe.' });
            }
        }

        if (usuarioId) {
            const usuario = await Usuario.findById(usuarioId);
            if (!usuario) {
                return res.status(404).json({ message: 'El usuario no existe.' });
            }
        }

        if (fechaInicio && fechaFin && new Date(fechaInicio) >= new Date(fechaFin)) {
            return res.status(400).json({ message: 'La fecha de inicio debe ser anterior a la fecha de fin.' });
        }

       
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

export const deleteReservas = async (req, res) => {
    try {
        const { id } = req.params;

        const reservaEliminada = await Reserva.findByIdAndDelete(id);
        if (!reservaEliminada) {
            return res.status(404).json({ message: 'Reserva no encontrada.' });
        }

        res.status(200).json({ message: 'Reserva eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reserva.', error: error.message });
    }
};
