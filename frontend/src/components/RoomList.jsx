// src/components/RoomList.jsx
// Lista las salas disponibles
import React from 'react';
import { salas } from '../data'; // Importa la lista de salas

function RoomList() {
    return (
        <div className="room-list">
            <h3>Lista de Salas</h3>
            <ul>
                {salas.map((sala) => (
                    <li key={sala.id}>
                        <h4>{sala.nombre}</h4>
                        <p><strong>Capacidad:</strong> {sala.capacidad}</p>
                        <p><strong>Estado:</strong> {sala.estado}</p>
                        <p><strong>Ubicación:</strong> {sala.ubicacion}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RoomList;

