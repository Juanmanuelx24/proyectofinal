import Sala from '../models/sala.js';

export const getSalas = async (req, res) => {
    try {
        const salas = await Sala.find(); // Obtener todas las salas
        res.status(200).json(salas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las salas.', error: error.message });
    }
};

// Crear una nueva sala
export const createSala = async (req, res) => {
    try {
        const { nombre, capacidad, estado, ubicacion } = req.body;

        // Validar los campos requeridos
        if (!nombre || !capacidad || !ubicacion) {
            return res.status(400).json({ message: 'Los campos nombre, capacidad y ubicación son obligatorios.' });
        }

        // Crear una nueva sala
        const nuevaSala = new Sala({ nombre, capacidad, estado, ubicacion });
        await nuevaSala.save();

        res.status(201).json({ message: 'Sala creada exitosamente.', sala: nuevaSala });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'Ya existe una sala con ese nombre.' });
        }
        res.status(500).json({ message: 'Error al crear la sala.', error: error.message });
    }
};

// Actualizar una sala
export const updateSala = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, capacidad, estado, ubicacion } = req.body;

        // Buscar y actualizar la sala
        const salaActualizada = await Sala.findByIdAndUpdate(
            id,
            { nombre, capacidad, estado, ubicacion },
            { new: true, runValidators: true }
        );

        if (!salaActualizada) {
            return res.status(404).json({ message: 'Sala no encontrada.' });
        }

        res.status(200).json({ message: 'Sala actualizada exitosamente.', sala: salaActualizada });
    } catch (error) {
        if (error.code === 11000) { 
            return res.status(400).json({ message: 'Ya existe una sala con ese nombre.' });
        }
        res.status(500).json({ message: 'Error al actualizar la sala.', error: error.message });
    }
};

// Eliminar una sala
export const deleteSala = async (req, res) => {
    try {
        const { id } = req.params;

        const salaEliminada = await Sala.findByIdAndDelete(id);

        if (!salaEliminada) {
            return res.status(404).json({ message: 'Sala no encontrada.' });
        }

        res.status(200).json({ message: 'Sala eliminada exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la sala.', error: error.message });
    }
};
