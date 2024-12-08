// src/components/reservaForm.jsx
//Crear o editar reservas
import React, { useState, useEffect } from 'react';
import { salas, usuarios, reservas } from '../data';

function ReservaForm({ reservaEditar, onReservaActualizada, onReservaCreada, onCancelarEdicion }) {
    const [selectedSala, setSelectedSala] = useState('');
    const [selectedFechaInicio, setSelectedFechaInicio] = useState('');
    const [selectedFechaFin, setSelectedFechaFin] = useState('');
    const [usuarioEmail, setUsuarioEmail] = useState('');
    const [error, setError] = useState('');
    const [mensaje, setMensaje] = useState('');

    const resetForm = () => {
        setSelectedSala('');
        setSelectedFechaInicio('');
        setSelectedFechaFin('');
        setUsuarioEmail('');
        setError('');
        setMensaje('');
    };

    useEffect(() => {
        if (reservaEditar) {
            setSelectedSala(reservaEditar.salaId.toString());
            setSelectedFechaInicio(reservaEditar.fechaInicio);
            setSelectedFechaFin(reservaEditar.fechaFin);
            const usuario = usuarios.find(u => u.id === reservaEditar.usuarioId);
            if (usuario) setUsuarioEmail(usuario.email);
        }
        else {
            resetForm();
        }
    }, [reservaEditar]);

    const handleSubmit = () => {
        const sala = salas.find(s => s.id === parseInt(selectedSala));
        const usuario = usuarios.find(u => u.email === usuarioEmail);

        // Verificar si la sala está disponible (activa) y cambiar el estado antes de actualizar
        if (!sala || sala.estado !== 'Activa') {
            // Si la sala está ocupada, hacerla disponible temporalmente para la actualización
            sala.estado = 'Activa';
        }

        // Verificar si el usuario existe
        if (!usuario) {
            setError('Usuario no encontrado con ese correo.');
            return;
        }

        // Convertir las fechas a objetos Date para compararlas correctamente
        const fechaInicio = new Date(selectedFechaInicio);
        const fechaFin = new Date(selectedFechaFin);

        // Verificar solapamiento de la reserva con otras existentes, pero no con la reserva que estamos editando
        const solapamiento = reservas.some(r =>
            r.salaId === sala.id &&
            r.id !== (reservaEditar?.id || null) && // Asegurarse de no verificar la reserva que estamos editando
            // Verificación de solapamiento
            ((new Date(r.fechaInicio) < fechaFin) && (new Date(r.fechaFin) > fechaInicio))
        );

        if (solapamiento) {
            setError('La sala ya está reservada en ese horario.');
            return;
        }

        // Actualizar la reserva si estamos editando
        if (reservaEditar) {
            reservaEditar.fechaInicio = selectedFechaInicio;
            reservaEditar.fechaFin = selectedFechaFin;
            onReservaActualizada(reservaEditar);

            // Marcar la sala nuevamente como ocupada después de la actualización
            sala.estado = 'Ocupada';
        } else {
            // Crear nueva reserva si no es una edición
            const nuevaReserva = {
                id: reservas.length + 1,
                salaId: sala.id,
                usuarioId: usuario.id,
                fechaInicio: selectedFechaInicio,
                fechaFin: selectedFechaFin,
                estado: 'Confirmada',
            };

            reservas.push(nuevaReserva);
            sala.estado = 'Ocupada'; // Cambiar el estado de la sala a 'Ocupada'
            onReservaCreada(nuevaReserva);
        }

        setError('');
        setMensaje(reservaEditar ? 'Reserva actualizada con éxito.' : 'Reserva realizada con éxito.');
        // Mostrar el mensaje y luego reiniciar el formulario después de un tiempo
        setTimeout(() => {
            resetForm();
        }, 2000); // Cambia 1000 por el número de milisegundos que desees (1 segundos en este caso)
    };

    return (
        <div className='reserva-form'>
            <h3>{reservaEditar ? 'Editar Reserva' : 'Nueva Reserva'}</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}

            <div>
                <label>
                    Usuario (Correo):
                    <input
                        type="email"
                        value={usuarioEmail}
                        onChange={(e) => setUsuarioEmail(e.target.value)}
                    />
                </label>
            </div>
            {!reservaEditar && (
                <div>
                    <label>
                        Sala:
                        <select value={selectedSala} onChange={(e) => setSelectedSala(e.target.value)}>
                            <option value="">Seleccione una sala</option>
                            {salas.filter(s => s.estado === 'Activa').map(sala => (
                                <option key={sala.id} value={sala.id}>
                                    {sala.nombre}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
            )}
            <div>
                <label>
                    Fecha y Hora de Inicio:
                    <input
                        type="datetime-local"
                        value={selectedFechaInicio}
                        onChange={(e) => setSelectedFechaInicio(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Fecha y Hora de Finalización:
                    <input
                        type="datetime-local"
                        value={selectedFechaFin}
                        onChange={(e) => setSelectedFechaFin(e.target.value)}
                    />
                </label>
            </div>

            <button onClick={handleSubmit}>
                {reservaEditar ? 'Actualizar Reserva' : 'Realizar Reserva'}
            </button>
            {reservaEditar && (
                <button onClick={onCancelarEdicion} style={{ marginLeft: '10px', backgroundColor: 'gray' }}>
                    Cancelar
                </button>
            )}
        </div>
    );
}

export default ReservaForm;
