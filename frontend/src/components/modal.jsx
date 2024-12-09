// src/components/Modal.jsx
//Modal de confirmacion de eliminar una reserva para ReservaList.jsx
import React from 'react';

function Modal({ mensaje, onConfirm, onCancel }) {
    return (
        <div className="modal">
            <div className="modal-content">
                <p>{mensaje}</p>
                <button onClick={onConfirm}>Sí</button>
                <button onClick={onCancel}>No</button>
            </div>
        </div>
    );
}

export default Modal;
