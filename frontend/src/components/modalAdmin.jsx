//Modal para perfil de admin
// src/components/modalAdmin.jsx
import React from 'react';

function ModalAdmin({ show, onClose, onConfirm, message }) {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onConfirm}>Confirmar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}

export default ModalAdmin;
