// src/components/UserProfile.jsx
// Muestra el perfil de usuario y permite editar
import React, { useState } from 'react';

// Componente para el perfil de usuario
function UserProfile({ usuario }) {
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        nombre: usuario.nombre,
        email: usuario.email,
        password: usuario.password, // Aunque la contraseña no se edita
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSave = () => {
        // Simula el guardado de cambios
        console.log("Cambios guardados:", form);
        setIsEditing(false);
    };

    return (
        <div className="profile-card">
            <h3>Perfil de Usuario</h3>

            {/* Mostrar el perfil en modo no editable o editable */}
            {!isEditing ? (
                <div>
                    <p><strong>Nombre:</strong> {form.nombre}</p>
                    <p><strong>Correo:</strong> {form.email}</p>
                    <p><strong>Rol:</strong> {usuario.rol}</p>
                    <p><strong>Contraseña:</strong> ********</p>
                </div>
            ) : (
                <div className='profile-card-form'>
                    <label>
                        Nombre:
                        <input
                            type="text"
                            name="nombre"
                            value={form.nombre}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        Correo:
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            disabled
                        />
                    </label>
                    <label>
                        Contraseña:
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </label>
                </div>
            )}

            {/* Botón para activar la edición */}
            {!isEditing ? (
                <button onClick={() => setIsEditing(true)}>Editar</button>
            ) : (
                <div>
                    <button onClick={handleSave}>Guardar</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;

