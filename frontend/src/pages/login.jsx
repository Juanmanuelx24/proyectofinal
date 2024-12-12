import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import client from '../api/client.js';
import Swal from 'sweetalert2'; 
import Navbar from "../components/Navbar";
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
const links = [
    { path: "/", label: "Bienvenidos" },
    { path: "/register", label: "Registrarse" },
];
  const [form, setForm] = useState({
    correo: '',
    contraseña: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { correo, contraseña } = form;

    if (!correo || !contraseña) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    setError('');

    try {
        const response = await client.post('/login', { correo, contraseña }, { withCredentials: true });
        console.log(response.data);  // Verifica la estructura completa de la respuesta
        const { rol, token } = response.data.user;  // Accede a 'rol' desde 'user'
        console.log("Rol recibido:", rol);  // Verifica el valor de 'rol'
        localStorage.setItem('authToken', token);
        localStorage.setItem('userRole', rol);
        
        if (rol && rol.toLowerCase() === 'admin') {
          navigate('/dashboardadmin');
        } else {
          navigate('/dashboarduser');
        }
        
        Swal.fire({
          title: '¡Bienvenido!',
          text: `¡Bienvenido, has iniciado sesión con éxito!`,
          icon: 'success',
          timer: 1000,
          confirmButtonText: 'Aceptar',
        });

    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Error al iniciar sesión.');
      } else {
        setError('Error de conexión con el servidor.');
      }
    }
  };

  return (
    
    <div>
      
      <Navbar links={links} />  
      <div className="form-container">
        <br />
        <br /> 
        <h2>Inicio de sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          
          <div className="input-container">
            <label>Correo:</label>
            <div className="input-field">
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

          <div className="input-container">
            <label>Contraseña:</label>
            <div className="input-field">
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

          <button className='submit-btn' type="submit">Iniciar sesión</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
