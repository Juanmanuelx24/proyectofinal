// src/components/UserRegistration.jsx
//Componente de admin
//  Lista de usuarios registrados
import React, { useState } from 'react';

function UserRegistration({ usuarios }) {
    const [mostrarUsuarios, setMostrarUsuarios] = useState(false);

    const toggleMostrarUsuarios = () => {
        setMostrarUsuarios(!mostrarUsuarios);
    };

    return (
        <div className="user-registration">
            <h3>Usuarios Registrados</h3>
            <button className="buton-user-register" onClick={toggleMostrarUsuarios}>
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
        </div>
    );
}

export default UserRegistration;
