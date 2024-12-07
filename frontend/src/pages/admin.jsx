// src/pages/admin.jsx
/*la página de administración se estructura con las siguientes secciones:
Un encabezado con el nombre de la página (Dashboard de Administrador).
Un listado de salas disponibles.
Un formulario para crear una nueva sala.
Una lista de las reservas activas (simulada por un arreglo).*/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirigir después de cerrar sesión
import SalaCard from '../components/salaCard'; // Importa el componente SalaCard
import SalaForm from '../components/salaForm'; // Importa el formulario SalaForm

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

    const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

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

    const handleCancelReserva = (id) => {
        setReservas(reservas.filter((reserva) => reserva.id !== id));
    };

    const toggleMostrarUsuarios = () => {
        setMostrarUsuarios(!mostrarUsuarios);
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
                        onDelete={() => handleDeleteSala(sala.id)}
                        onEdit={(updatedData) => handleEditSala(sala.id, updatedData)}
                    />
                ))}
            </div>

            <h3>Crear Nueva Sala</h3>
            <SalaForm setSalas={setSalas} />

            <h3>Reservas Activas</h3>
            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        {reserva.usuario} - {reserva.sala} ({reserva.estado})
                        <button onClick={() => handleCancelReserva(reserva.id)}>Cancelar</button>
                    </li>
                ))}
            </ul>

            <h3>Usuarios Registrados</h3>
            <button className='buton-user-register' onClick={toggleMostrarUsuarios}>
                {mostrarUsuarios ? 'Ocultar Usuarios Registrados' : 'Listar Usuarios Registrados'}
            </button>
            {mostrarUsuarios && (
                <div className="usuarios-lista">
                    <ul>
                        {usuarios.map((usuario) => (
                            <li key={usuario.id}>
                                {usuario.nombre} - {usuario.email}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <button id="logoutButton" onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
}

export default AdminDashboard;

