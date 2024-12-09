// src/pages/admin.jsx
//Dashboard de Administrador

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de cerrar sesión
import SalaCard from '../components/admin/salaCard'; // Importa el componente SalaCard
import SalaForm from '../components/admin/salaForm'; // Importa el formulario SalaForm
import ActiveReservations from '../components/admin/activeReservations';
import UserRegistration from '../components/admin/userRegistration'; // Importar los usuarios registrados

function AdminDashboard() {
    const [salas, setSalas] = useState([
        { id: 1, nombre: 'Sala A', capacidad: 100, estado: 'Activo', ubicacion: 'Ciudad A' },
        { id: 2, nombre: 'Sala B', capacidad: 100, estado: 'Inactivo', ubicacion: 'Ciudad B' },
        { id: 3, nombre: 'Sala C', capacidad: 100, estado: 'Ocupado', ubicacion: 'Ciudad C' },
    ]);

    const [reservas, setReservas] = useState([
        { id: 1, usuario: 'Usuario 1', sala: 'Sala A', estado: 'Activa' },
        { id: 2, usuario: 'Usuario 2', sala: 'Sala B', estado: 'Activa' },
    ]);

    // Lista de usuarios registrados (hardcodeada por ahora)
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com' },
        { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com' },
        { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com' },
    ]);

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminLoggedIn');
        navigate('/');
    };

    const handleDeleteSala = (id) => {
        setSalas(salas.filter((sala) => sala.id !== id));
    };

    const handleEditSala = (id, updatedData) => {
        setSalas(salas.map((sala) => (sala.id === id ? { ...sala, ...updatedData } : sala)));
    };

    return (
        <div className="container-admin">
            <h2>Dashboard de Administrador</h2>

            <h3>Lista de Salas</h3>
            <div>
                {salas.map((sala) => (
                    <SalaCard
                        key={sala.id}
                        sala={sala}
                        salas={salas} // Pasar todas las salas existentes
                        onDelete={() => handleDeleteSala(sala.id)}
                        onEdit={(updatedData) => handleEditSala(sala.id, updatedData)}
                    />
                ))}
            </div>

            <h3>Crear Nueva Sala</h3>
            {/* Permite la creacion de nuevas salas, con validaciones de datos */}
            <SalaForm setSalas={setSalas} salas={salas} />

            {/* Manejamos la lógica de reservas y el modal de confirmación directamente en este componente.
            Recibe las props reservas y setReservas para administrar la lista desde AdminDashboard. */}
            <ActiveReservations reservas={reservas} setReservas={setReservas} />

            {/* importamos la lista de usuarios registrados para simplificar admin.jsx */}
            <UserRegistration usuarios={usuarios} />

            <button id="logoutButton" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default AdminDashboard;

