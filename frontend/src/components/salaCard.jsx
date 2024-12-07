// Este componente mostrará la información de cada sala (nombre, capacidad, estado y ubicación).
// Se conceta con admin.jsx
// src/components/salaCard.jsx
import React, { useState } from 'react';

function SalaCard({ sala, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({
        nombre: sala.nombre,
        capacidad: sala.capacidad,
        estado: sala.estado,
        ubicacion: sala.ubicacion,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedData({ ...editedData, [name]: value });
    };

    const handleSave = () => {
        onEdit(editedData);
        setIsEditing(false);
    };

    return (
        <div className="sala-card">
            {isEditing ? (
                <div>
                    <input
                        type="text"
                        name="nombre"
                        value={editedData.nombre}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="capacidad"
                        value={editedData.capacidad}
                        onChange={handleInputChange}
                    />
                    <select
                        name="estado"
                        value={editedData.estado}
                        onChange={handleInputChange}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                        <option value="Ocupado">Ocupado</option>
                    </select>
                    <input
                        type="text"
                        name="ubicacion"
                        value={editedData.ubicacion}
                        onChange={handleInputChange}
                    />
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            ) : (
                <div>
                    <h3>{sala.nombre}</h3>
                    <p>Capacidad: {sala.capacidad}</p>
                    <p>Estado: {sala.estado}</p>
                    <p>Ubicación: {sala.ubicacion}</p>
                    <button onClick={() => setIsEditing(true)}>Editar</button>
                    <button onClick={onDelete}>Eliminar</button>
                </div>
            )}
        </div>
    );
}

export default SalaCard;

