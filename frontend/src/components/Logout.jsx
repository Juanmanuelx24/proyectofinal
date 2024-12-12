import { useNavigate } from 'react-router-dom';
import client from '../api/client.js';
import Swal from 'sweetalert2'; 

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await client.post('/logout', {}, {
          withCredentials: true, 
        });
        localStorage.removeItem('authToken');
        localStorage.removeItem('userRole');
        Swal.fire({
          title: '¡Cerraste sesión!',
          text: 'Has cerrado sesión exitosamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
          timer: 1000
        });
        setTimeout(() => {
          navigate('/login');
        });
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };
  return (
    <button onClick={handleLogout} className="logout-button">Cerrar sesión</button>
  );
}
export default Logout;
