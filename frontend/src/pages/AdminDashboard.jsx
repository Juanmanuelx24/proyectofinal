import { useState, useEffect } from 'react';
import Navbar from '../components/admin/NavbarAdmin';
import client from '../api/client.js'; 
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import Swal from 'sweetalert2'; 

function DashboardAdmin() {
  const [admin, setAdmin] = useState({
    nombre: '',
    correo: '',
    rol: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [newSala, setNewSala] = useState({
    nombre: '',
    capacidad: 1,
    estado: 'Activo',
    ubicacion: '',
  }); 
  const [editingSala, setEditingSala] = useState(null); // Estado para editar sala
  const [filter, setFilter] = useState('Todas');

  

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true); 
      try {
        const response = await client.get('/profile'); 
        console.log("Respuesta de la API:", response.data); 
        if (response.data && response.data.user) {
          setAdmin({
            nombre: response.data.user.nombre || 'No disponible',
            correo: response.data.user.correo || 'No disponible',
            rol: response.data.user.rol || 'No disponible',
          });
        }
      } catch (err) {
        console.error('Error al obtener los datos del administrador:', err);
        setError(err?.response?.data?.message || 'Error desconocido al obtener los datos del administrador');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.response?.data?.message || 'Error desconocido al obtener los datos del administrador',
        });
      } finally {
        setLoading(false);
      }
    };

    const fetchSalas = async () => {
      try {
        const response = await client.get('/sala');  
        setSalas(response.data);  
      } catch (err) {
        console.error("Error al obtener las salas: ", err);  
        setError(err?.response?.data?.message || 'No se pudieron obtener las salas');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.response?.data?.message || 'No se pudieron obtener las salas',
        });
      }
    };
    const fetchReservas = async () => {
      try {
        const response = await client.get('/reservas'); 
        setReservas(response.data); // Los datos obtenidos del servidor se asignan al estado
      } catch (err) {
        console.error('Error al obtener las reservas:', err);
        setError(err?.response?.data?.message || 'Error desconocido al obtener las reservas');
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.response?.data?.message || 'Error desconocido al obtener las reservas',
        });
      }
   };   
  
    fetchReservas();
    fetchSalas();
    fetchAdminData(); 
  }, []); 

  const handleCreateSala = async () => {
    const { nombre, capacidad, estado, ubicacion } = newSala;
    
    if (!nombre || !ubicacion || capacidad < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }

    try {
      const response = await client.post('/sala', { nombre, capacidad, estado, ubicacion });
      setSalas([...salas, response.data.sala]); // Añadir la nueva sala a la lista
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Sala creada exitosamente!',
        timer: 1000
      });
      setNewSala({ nombre: '', capacidad: 1, estado: 'Activo', ubicacion: '' }); // Limpiar los campos del formulario
    } catch (err) {
      console.error('Error al crear la sala:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err?.response?.data?.message || 'Error desconocido al crear la sala.',
      });
    }
  };
  const handleDeleteSala = async (id) => {
    // Verificar si la sala tiene reservas activas
    const reservasActivas = reservas.some((reserva) => reserva.salaId === id && reserva.estado === 'Activa');
    
    if (reservasActivas) {
      // Mostrar alerta indicando que la sala está reservada y no se puede eliminar
      Swal.fire({
        icon: 'warning',
        title: 'Sala en uso',
        text: 'La sala está siendo reservada y no puede ser eliminada.',
      });
      return; // No continuar con la eliminación
    }
  
    // Si no hay reservas activas, proceder con la alerta de confirmación
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar esta sala después de eliminarla.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      try {
        await client.delete(`/sala/${id}`); // Eliminar la sala por su ID
        setSalas(salas.filter((sala) => sala.id !== id && sala._id !== id)); // Filtrar la sala eliminada
        Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: 'La sala ha sido eliminada exitosamente.',
          timer: 1000,
        });
      } catch (err) {
        console.error('Error al eliminar la sala:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.response?.data?.message || 'Error desconocido al eliminar la sala.',
        });
      }
    }
  };
  
  const handleEditSala = (sala) => {
    setEditingSala(sala); // Establecer la sala que estamos editando
    setNewSala({
      nombre: sala.nombre,
      capacidad: sala.capacidad,
      estado: sala.estado,
      ubicacion: sala.ubicacion,
    });
  };

  const handleUpdateSala = async () => {
    const { nombre, capacidad, estado, ubicacion } = newSala;
  
    // Verificar si la sala está inactiva
    if (estado === 'Inactivo' && editingSala) {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Estás editando una sala inactiva, algunas acciones podrían estar limitadas.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, continuar',
        cancelButtonText: 'Cancelar',
      });
  
      if (!result.isConfirmed) {
        return; // No continuar si el usuario cancela
      }
    }
  
    if (!editingSala?.id && !editingSala?._id) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se puede identificar la sala que se está editando.',
      });
      return;
    }
  
    if (!nombre || !ubicacion || capacidad < 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente.',
      });
      return;
    }
  
    try {
      await client.put(
        `/sala/${editingSala.id || editingSala._id}`, 
        { nombre, capacidad, estado, ubicacion }
      );
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Sala actualizada exitosamente!',
        timer: 1000,
      });
      setEditingSala(null); 
      setNewSala({ nombre: '', capacidad: 1, estado: 'Activo', ubicacion: '' });
  
      // Recargar las salas después de la edición
      const responseSalas = await client.get('/sala');
      setSalas(responseSalas.data);
  
      // Recargar las reservas después de la edición de la sala
      const responseReservas = await client.get('/reservas');
      setReservas(responseReservas.data);
    } catch (err) {
      console.error('Error al actualizar la sala:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err?.response?.data?.message || 'Error desconocido al actualizar la sala.',
      });
    }
  };
  

  const filteredSalas = salas.filter((sala) =>
    filter === 'Todas' ? true : sala.estado === filter
  );

  if (loading) {
    return <p>Cargando datos del administrador...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <h1 className='titulo-admin'>Bienvenido Administrador</h1>
        
        <div className='admin-card-profile'>
          <h2>Perfil del Administrador</h2>
          <p><strong>Nombre:</strong> {admin.nombre}</p>
          <p><strong>Correo Electrónico:</strong> {admin.correo}</p>
          <p><strong>Rol:</strong> {admin.rol}</p>
        </div>
        
        <div className='container-profile'>
          <h2>{editingSala ? 'Editar Sala' : 'Crear Nueva Sala'}</h2>
          <input
            type="text"
            value={newSala.nombre}
            onChange={(e) => setNewSala({ ...newSala, nombre: e.target.value })}
            placeholder="Nombre de la nueva sala"
            className="admin-input"
          />
          <input
            type="number"
            value={newSala.capacidad}
            onChange={(e) => setNewSala({ ...newSala, capacidad: e.target.value })}
            placeholder="Capacidad"
            className="admin-input"
          />
          <select
            value={newSala.estado}
            onChange={(e) => setNewSala({ ...newSala, estado: e.target.value })}
            className="admin-input"
          >
            <option value="Activo">Activo</option>
            <option value="Inactivo">Inactivo</option>
          </select>
          <input
            type="text"
            value={newSala.ubicacion}
            onChange={(e) => setNewSala({ ...newSala, ubicacion: e.target.value })}
            placeholder="Ubicación"
            className="admin-input"
          />
          {editingSala ? (
            <div>
              <button onClick={handleUpdateSala} className="edit-button">Actualizar Sala</button>
              <button onClick={() => setEditingSala(null)} className="cancel-button">Cancelar</button>
            </div>
          ) : (
            <div>
              <button onClick={handleCreateSala} className="admin-button ">Crear Sala</button>
            </div>
          )}
        </div>

        <div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="admin-input"
          >
            <option value="Todas">Todas</option>
            <option value="Activo">Activas</option>
            <option value="Inactivo">Inactivas</option>
          </select>
        </div>
        <h2>Salas creadas</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Capacidad</th>
              <th>Estado</th>
              <th>Ubicación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredSalas.map((sala, index) => (
              <tr key={`${sala.id || sala._id}-${index}`} className={sala.estado === 'Inactivo' ? 'inactive-row' : ''}>
                <td>{sala.nombre}</td>
                <td>{sala.capacidad}</td>
                <td>{sala.estado}</td>
                <td>{sala.ubicacion}</td>
                <td>
                  <button
                    onClick={() => handleEditSala(sala)}
                    className="edit-icon"
                    disabled={sala.estado === 'Inactivo'}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteSala(sala.id || sala._id)}
                    className="delete-icon"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h2>Reservas</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Sala</th>
                <th>Usuario</th>
                <th>Fecha Inicio</th>
                <th>Fecha Fin</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {reservas.map((reserva) => (
                <tr key={reserva._id}>
                  <td>{reserva.salaId?.nombre || 'Desconocido'}</td>
                  <td>{reserva.usuarioId?.nombre || 'Desconocido'}</td>
                  <td>{new Date(reserva.fechaInicio).toLocaleString()}</td>
                  <td>{new Date(reserva.fechaFin).toLocaleString()}</td>
                  <td>{reserva.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
