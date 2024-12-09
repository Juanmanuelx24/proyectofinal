// src/pages/user.jsx
//Pagina principal de usuarios
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usuarios, reservas } from '../data'; // Asegúrate de importar 'reservas' también
import UserProfile from '../components/client/UserProfile';
import RoomList from '../components/client/RoomList';
import ReservaList from '../components/client/ReservaList';
import ReservaForm from '../components/client/reservaForm';

function UserDashboard() {
    const userId = 2; // Cambiar por la lógica de autenticación real
    const usuario = usuarios.find((user) => user.id === userId);

    const [showProfile, setShowProfile] = useState(false);
    const [showReservaForm, setShowReservaForm] = useState(false);
    const [showReservaList, setShowReservaList] = useState(false);
    const [showActualizarReserva, setShowActualizarReserva] = useState(false); // Nuevo estado para la actualización

    const [reservaActual, setReservaActual] = useState(null);
    const [reservasState, setReservasState] = useState([...reservas]); // Usa las reservas importadas

    const navigate = useNavigate(); // Hook para la navegación

    const handleLogout = () => {
        // Aquí puedes agregar lógica para limpiar el estado de autenticación si es necesario
        navigate('/'); // Redirige a la página principal
    };

    const onEditarReserva = (reservaId) => {
        const reserva = reservasState.find((r) => r.id === reservaId);
        if (reserva) {
            setReservaActual(reserva);  // Asignamos la reserva actual a editar
            setShowReservaForm(true);   // Mostramos el formulario para editar
        }
    };

    const onReservaActualizada = (reservaActualizada) => {
        setReservasState((prev) =>
            prev.map((r) => (r.id === reservaActualizada.id ? reservaActualizada : r))
        );
        setReservaActual(null);
        setShowReservaForm(false);  // Ocultar el formulario después de la actualización
    };

    const onReservaCreada = (nuevaReserva) => {
        setReservasState((prev) => [...prev, nuevaReserva]);
    };

    const onEliminarReserva = (reservaId) => {
        setReservasState((prev) => prev.filter((r) => r.id !== reservaId)); // Eliminamos la reserva
    };

    const onCancelarEdicion = () => {
        setReservaActual(null);
        setShowReservaForm(false);
    };

    return (
        <div className="container-user">
            <h2>Dashboard de Usuario</h2>
            <button onClick={() => setShowProfile(!showProfile)}>
                {showProfile ? "Ocultar Perfil" : "Ver Perfil"}
            </button>
            {showProfile && <UserProfile usuario={usuario} />}
            <RoomList />
            <div className='container-reservas'>
                <div className='buttons-reserva'>
                    <button onClick={() => setShowReservaForm(!showReservaForm)}>
                        {showReservaForm ? "Ocultar Formulario de Reserva" : "Realizar Reserva"}
                    </button>
                    <button onClick={() => setShowReservaList(!showReservaList)}>
                        {showReservaList ? "Ocultar Lista de Reservas" : "Ver Mis Reservas"}
                    </button>
                </div>
                {showReservaForm && (
                    <ReservaForm
                        reservaEditar={reservaActual}  // Asegúrate de que 'reservaActual' contiene la reserva correcta
                        onReservaActualizada={onReservaActualizada}
                        onReservaCreada={onReservaCreada}
                        onReservaEliminada={onEliminarReserva}  // Pasamos la función para eliminar reserva
                        onCancelarEdicion={onCancelarEdicion}
                    />
                )}
                {showReservaList && <ReservaList onEditarReserva={onEditarReserva} />}
            </div>
            <button id='logoutButtonUser' onClick={handleLogout}>
                Cerrar Sesión
            </button>
        </div>
    );
}

export default UserDashboard;


