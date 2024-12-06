// src/components/salaForm.jsx
//Este formulario permitirá al administrador agregar nuevas salas.
import React, { useState } from 'react';

function SalaForm({ setSalas }) {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState(100);
  const [estado, setEstado] = useState('Activo');
  const [ubicacion, setUbicacion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !ubicacion) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    const nuevaSala = {
      id: Date.now(), // Utiliza el timestamp como ID único
      nombre,
      capacidad,
      estado,
      ubicacion,
    };

    setSalas((prevSalas) => [...prevSalas, nuevaSala]);
    setNombre('');
    setCapacidad(100);
    setEstado('Activo');
    setUbicacion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nombre:</label>
      <input
        type="text"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />

      <label>Capacidad:</label>
      <input
        type="number"
        value={capacidad}
        onChange={(e) => setCapacidad(e.target.value)}
        required
      />

      <label>Estado:</label>
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        required
      >
        <option value="Activo">Activo</option>
        <option value="Inactivo">Inactivo</option>
        <option value="Ocupado">Ocupado</option>
      </select>

      <label>Ubicación:</label>
      <input
        type="text"
        value={ubicacion}
        onChange={(e) => setUbicacion(e.target.value)}
        required
      />

      <button type="submit">Crear Sala</button>
    </form>
  );
}

export default SalaForm;

