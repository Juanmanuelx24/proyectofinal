// src/components/salaForm.jsx
//Este formulario permitirá al administrador agregar nuevas salas.
import React, { useState } from 'react';

function SalaForm({ setSalas, salas }) {
  const [nombre, setNombre] = useState('');
  const [capacidad, setCapacidad] = useState(100);
  const [estado, setEstado] = useState('Activo');
  const [ubicacion, setUbicacion] = useState('');
  const [error, setError] = useState(''); // Para manejar mensajes de error

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos vacíos o con solo espacios en blanco
    if (!nombre.trim() || !ubicacion.trim()) {
      setError('Todos los campos son obligatorios y no pueden contener solo espacios en blanco.');
      return;
    }

    // Validación de nombres duplicados
    const nombreDuplicado = salas.some(
      (sala) => sala.nombre.toLowerCase() === nombre.trim().toLowerCase()
    );

    if (nombreDuplicado) {
      setError('El nombre de la sala ya existe. Por favor, elija otro nombre.');
      return;
    }

    // Validación de capacidad (mayor que 0 y no mayor a 100)
    if (capacidad <= 0 || capacidad > 100) {
      setError('La capacidad debe ser un número mayor a 0 y menor o igual a 100.');
      return;
    }

    // Crear nueva sala si todas las validaciones pasan
    const nuevaSala = {
      id: Date.now(), // Utiliza el timestamp como ID único
      nombre: nombre.trim(),
      capacidad,
      estado,
      ubicacion: ubicacion.trim(),
    };

    setSalas((prevSalas) => [...prevSalas, nuevaSala]);
    handleCancel(); // Limpiar los datos del formulario después de guardar
  };

  const handleCancel = () => {
    setNombre('');
    setCapacidad(100);
    setEstado('Activo');
    setUbicacion('');
    setError(''); // Limpia el mensaje de error
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

      {error && <p style={{ color: 'red', margin: '0.8em 0'}}>{error}</p>}

      <button type="submit">Crear Sala</button>
      <button type="button" onClick={handleCancel}>Cancelar</button>
    </form>
  );
}

export default SalaForm;
