import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import client from '../api/client.js'; 
import '../App.css';
import Navbar from '../components/Navbar.jsx'
import { FaUser, FaEnvelope, FaLock, FaRegUserCircle } from 'react-icons/fa';

function Register() {
  const links = [
    { path: "/", label: "Bienvenidos" },
    { path: "/login", label: "Iniciar sesión" },
  ];
  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    rol: '',
    contraseña: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, correo, rol, contraseña } = form;

    if (!nombre || !correo || !rol || !contraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    setLoading(true);

    client.post('/register', { nombre, correo, rol, contraseña })
      .then((response) => {
        console.log('Usuario registrado:', response.data);


        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: `¡Bienvenido, ${nombre}! Usuario registrado exitosamente.`,
          timer: 1000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
        
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Hubo un error al registrar el usuario.',
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Navbar links={links} />
      <div className="form-register">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="input-register">
            <label>Nombre:</label>
            <div className="input-register-field">
              <FaUser />
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
              />
            </div>
          </div>

          <div className="input-register">
            <label>Correo:</label>
            <div className="input-register-field">
              <FaEnvelope />
              <input
                type="email"
                name="correo"
                value={form.correo}
                onChange={handleChange}
                placeholder="Ingresa tu correo"
              />
            </div>
          </div>

          <div className="input-register">
            <label>Rol:</label>
            <div className="input-register-field">
              <FaRegUserCircle /> {/* Ícono para el campo de Rol */}
              <select
                name="rol"
                value={form.rol}
                onChange={handleChange}
              >
                <option value="">Selecciona tu rol</option>
                <option value="usuario">Cliente</option>
              </select>
            </div>
          </div>

          <div className="input-register">
            <label>Contraseña:</label>
            <div className="input-register-field">
              <FaLock />
              <input
                type="password"
                name="contraseña"
                value={form.contraseña}
                onChange={handleChange}
                placeholder="Ingresa tu contraseña"
              />
            </div>
          </div>

          <button className='submit-btn' type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>


      </div>
    </div>
  );
}

export default Register;
