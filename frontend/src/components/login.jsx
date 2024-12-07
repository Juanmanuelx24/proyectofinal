//Inicio de sesion para usuario o Admin
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usuarios } from '../data'; // Importamos el arreglo de usuarios

function Login() {
  const [form, setForm] = useState({
    email: '',
    contraseña: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Necesario para la redirección

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, contraseña } = form;

    // Validación de campos
    if (!email || !contraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');

    // Verificar las credenciales del usuario
    const usuario = usuarios.find(user => user.email === email);

    if (usuario && usuario.password === contraseña) {
      // Guardar el rol del usuario en el localStorage para su uso posterior
      localStorage.setItem('userRole', usuario.rol);
    
      // Redirigir según el rol
      if (usuario.rol === 'admin') {
        navigate('/admin'); // Redirige al dashboard de admin
      } else if (usuario.rol === 'usuario') {
        navigate('/user'); // Redirige al dashboard de usuario
      }
    } else {
      setError('Email o contraseña incorrectos.');
    }
  };

  return (
    <div className="form-container">
      <h2>Inicio de sesión</h2>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <label>Contraseña:</label>
        <input
          type="password"
          name="contraseña"
          value={form.contraseña}
          onChange={handleChange}
          required
        />
        
        <button type="submit">Iniciar sesión</button>
      </form>

      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}

export default Login;


