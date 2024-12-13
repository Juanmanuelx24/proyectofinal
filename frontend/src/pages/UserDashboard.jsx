import { useState, useEffect } from 'react';
import Navbar from '../components/client/NavbarUser';
import client from '../api/client.js';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';

function DashboardUser() {
  const [user, setUser] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    usuarioId: '', 
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [formData, setFormData] = useState({
    salaId: '',
    fechaInicio: '',
    fechaFin: '',
    usuarioId: '', // Añadimos usuarioId aquí
  });
  const [editing, setEditing] = useState(false);
  const [editReservaId, setEditReservaId] = useState(null);

  // Función para obtener el ID del usuario logeado
  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await client.get('/profile');
      setUser({
        nombre: response.data.user.nombre || 'No disponible',
        correo: response.data.user.correo || 'No disponible',
        contraseña: '********',
        usuarioId: response.data.user.id, 
      });
      
    } catch (err) {
      setError('Error al obtener los datos del usuario', err);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener las reservas
  const fetchReservas = async () => {
    try {
      const response = await client.get('/reservas');
      setReservas(response.data);
    } catch (err) {
      setError('Error al obtener las reservas', err);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchReservas(); // Llamada a fetchReservas aquí
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await client.get('/sala');
      setSalas(response.data);
    } catch (err) {
      setError('Error al obtener las salas disponibles', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.salaId || !formData.fechaInicio || !formData.fechaFin) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos.',
        icon: 'error',
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }
  
    if (!user.usuarioId) {
      Swal.fire({
        title: 'Error',
        text: 'Usuario no identificado. Por favor, inicia sesión nuevamente.',
        icon: 'error',
        timer: 1000,
        timerProgressBar: true,
      });
      return;
    }
  
    try {
      const reservaData = { ...formData, usuarioId: user.usuarioId };
      if (editing) {
        await client.put(`/reservas/${editReservaId}`, reservaData);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Reserva actualizada correctamente.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
        });
      } else {
        await client.post('/reservas', reservaData);
        Swal.fire({
          title: '¡Éxito!',
          text: 'Reserva creada correctamente.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
        });
      }
      setFormData({
        salaId: '',
        fechaInicio: '',
        fechaFin: '',
      });
      setEditing(false);
      setEditReservaId(null);
      fetchReservas();
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Error, esta sala está reservada a esta hora.',
        icon: 'error',
        timer: 1000,
        timerProgressBar: true,
      });
    }
  };
  

  const handleEdit = (reservaId) => {
    const reserva = reservas.find((r) => r._id === reservaId); // Cambio aquí
    if (reserva) {
      setFormData({
        salaId: reserva.salaId._id,
        fechaInicio: new Date(reserva.fechaInicio).toISOString().slice(0, 16),
        fechaFin: new Date(reserva.fechaFin).toISOString().slice(0, 16),
        usuarioId: reserva.usuarioId, // Añadimos usuarioId al editar
      });
      setEditing(true);
      setEditReservaId(reservaId);
    }
  };

  const handleDelete = async (reservaId) => {
    const result = await Swal.fire({
      title: '¿Deseas eliminar esta reserva?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        await client.delete(`/reservas/${reservaId}`);
        setReservas(reservas.filter((reserva) => reserva._id !== reservaId));
        Swal.fire({
          title: '¡Eliminado!',
          text: 'La reserva ha sido eliminada.',
          icon: 'success',
          timer: 1000,
          timerProgressBar: true,
        });
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la reserva.',
          icon: 'error',
          timer: 1000,
          timerProgressBar: true,
        });
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      salaId: '',
      fechaInicio: '',
      fechaFin: '',
    });
    setEditing(false);
    setEditReservaId(null);
  };

  if (loading) {
    return <p>Cargando datos del usuario...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Filtrar las reservas para mostrar solo las del usuario autenticado
  const userReservas = reservas.filter(reserva => reserva.usuarioId._id === user.usuarioId);

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 className='titulo-admin'>Bienvenido {user.nombre}</h1>
        <div className='admin-card-profile'>
          <h2>Perfil del Usuario</h2>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {user.correo}</p>
          <p><strong>Contraseña:</strong> {user.contraseña}</p>
          
        </div>

        <div className='container-profile'>
          <h2>{editing ? 'Editar Reserva' : 'Crear Nueva Reserva'}</h2>
          <form onSubmit={handleFormSubmit}>
            <select
              name="salaId"
              value={formData.salaId}
              onChange={handleInputChange}
              className="admin-input"
              disabled={editing} // Deshabilitamos la selección de sala al editar
            >
              <option value="">Selecciona una sala</option>
              {salas.map((sala) => (
                <option key={sala._id} value={sala._id}>
                  {sala.nombre} ({sala.capacidad} personas)
                </option>
              ))}
            </select>
            <input
              type="datetime-local"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
              className="admin-input"
            />
            <input
              type="datetime-local"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={handleInputChange}
              className="admin-input"
            />
            <div>
              <button type="submit" className="admin-button">
                {editing ? 'Actualizar Reserva' : 'Crear Reserva'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="cancel-button"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2>Reservas</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sala</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {userReservas.map((reserva) => (
                <tr key={reserva._id}>
                  <td>{reserva.salaId?.nombre || 'Desconocido'}</td>
                  <td>{new Date(reserva.fechaInicio).toLocaleString()}</td>
                  <td>{new Date(reserva.fechaFin).toLocaleString()}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(reserva._id)}
                      className="edit-icon"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(reserva._id)}
                      className="delete-icon"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardUser;
