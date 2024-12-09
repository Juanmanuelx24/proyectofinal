// src/components/ActiveReservations.jsx
import React, { useState } from 'react';
import ModalAdmin from './modalAdmin';

function ActiveReservations({ reservas, setReservas }) {
    const [showModal, setShowModal] = useState(false);
    const [reservaAEliminar, setReservaAEliminar] = useState(null);

    const handleCancelReserva = (id) => {
        setReservaAEliminar(id);
        setShowModal(true);
    };

    const handleConfirmCancel = () => {
        setReservas(reservas.filter((reserva) => reserva.id !== reservaAEliminar));
        setShowModal(false);
        setReservaAEliminar(null);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setReservaAEliminar(null);
    };

    return (
        <div className="active-reservations">
            <h3>Reservas Activas</h3>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        {reserva.usuario} - {reserva.sala} ({reserva.estado})
                        <button onClick={() => handleCancelReserva(reserva.id)}>Cancelar</button>
                    </li>
                ))}
            </ul>

            {/* Modal de Confirmación de Cancelación */}
            <ModalAdmin
                show={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancel}
                message="¿Estás seguro de que deseas cancelar esta reserva?"
            />
        </div>
    );
}

export default ActiveReservations;
