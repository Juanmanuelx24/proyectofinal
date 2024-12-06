import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    rol: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, email, rol, contraseña, confirmarContraseña } = form;
    if (!nombre || !email || !rol || !contraseña || !confirmarContraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    setError('');
    console.log(form); // Enviar los datos al backend o procesarlos
  };

  return (
    <div className="form-container">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <label>Rol:</label>
        <select
          name="rol"
          value={form.rol}
          onChange={handleChange}
          required
        >
          <option value="">Selecciona tu rol</option>
          <option value="usuario">Usuario</option>
          <option value="admin">Administrador</option>
        </select>

        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={form.contraseña}
          onChange={handleChange}
          required
        />
        <label>Confirmar contraseña:</label>
        <input
          type="password"
          name="confirmarContraseña"
          value={form.confirmarContraseña}
          onChange={handleChange}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  );
}

export default Register;
