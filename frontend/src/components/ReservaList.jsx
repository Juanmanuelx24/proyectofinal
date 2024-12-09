// src/components/ReservaList.jsx
// Lista las reservas realizadas en user.jsx y redirecciona a reservaFrom para editar una reserva
import React, { useState } from 'react';
import { reservas, salas, usuarios } from '../data';
import Modal from './Modal';

function ReservaList({ onEditarReserva }) {
    const [reservaEliminar, setReservaEliminar] = useState(null);
    const [reservaEditar, setReservaEditar] = useState(null);

    // Función para verificar si la sala está disponible
    const estaSalaDisponible = (salaId, fechaInicio, fechaFin, reservaEditar) => {
        // Verificamos si hay otras reservas que se superpongan con las fechas seleccionadas
        return !reservas.some((reserva) => {
            if (reserva.salaId === salaId && reserva.id !== reservaEditar?.id) { // Excluye la reserva que estamos editando
                return (
                    (new Date(reserva.fechaInicio) < new Date(fechaFin)) &&
                    (new Date(reserva.fechaFin) > new Date(fechaInicio))
                );
            }
            return false;
        });
    };

    const handleEliminar = () => {
        const reserva = reservas.find(r => r.id === reservaEliminar.id);
        const sala = salas.find(s => s.id === reserva.salaId);
    
        // Restaurar el estado de la sala a "Disponible" cuando se elimina una reserva
        const index = reservas.findIndex(r => r.id === reservaEliminar.id);
        if (index !== -1) {
            reservas.splice(index, 1);
            sala.estado = 'Disponible'; // Cambiar estado a disponible
        }
    
        setReservaEliminar(null); // Cerrar modal de confirmación
    };

    const handleEditar = (reservaId, nuevaSalaId, nuevaFechaInicio, nuevaFechaFin) => {
        if (estaSalaDisponible(nuevaSalaId, nuevaFechaInicio, nuevaFechaFin, reservaEditar)) {
            // Si la sala está disponible, procedemos con la actualización
            const reserva = reservas.find(r => r.id === reservaId);
            reserva.salaId = nuevaSalaId;
            reserva.fechaInicio = nuevaFechaInicio;
            reserva.fechaFin = nuevaFechaFin;
    
            // Marcar la sala como ocupada o no disponible
            const sala = salas.find(s => s.id === nuevaSalaId);
            sala.estado = 'No Disponible';
    
            setReservaEditar(null); // Cerrar modal de edición
        } else {
            alert('La sala seleccionada no está disponible para reservar en estas fechas.');
        }
    };
    

    return (
        <div className='salas-reservadas'>
            <h3>Mis Reservas</h3>
            {reservas.length === 0 ? (
                <p>No tienes reservas.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Sala</th>
                            <th>Fecha de Inicio</th>
                            <th>Fecha de Fin</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservas.map((reserva) => (
                            <tr key={reserva.id}>
                                <td>{usuarios.find((u) => u.id === reserva.usuarioId)?.nombre}</td>
                                <td>{salas.find((s) => s.id === reserva.salaId)?.nombre}</td>
                                <td>{reserva.fechaInicio}</td>
                                <td>{reserva.fechaFin}</td>
                                <td>
                                    <button onClick={() => onEditarReserva(reserva.id)}>Editar</button>
                                    <button onClick={() => setReservaEliminar(reserva)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {reservaEliminar && (
                <Modal
                    mensaje="¿Estás seguro de eliminar esta reserva?"
                    onConfirm={handleEliminar}
                    onCancel={() => setReservaEliminar(null)}
                />
            )}

            {reservaEditar && (
                <Modal
                    mensaje="¿Estás seguro de editar esta reserva?"
                    onConfirm={() => handleEditar(reservaEditar.id, reservaEditar.salaId, reservaEditar.fechaInicio, reservaEditar.fechaFin)}
                    onCancel={() => setReservaEditar(null)}
                />
            )}
        </div>
    );
}

export default ReservaList;
