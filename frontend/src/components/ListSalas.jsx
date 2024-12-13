import { useState, useEffect } from 'react';
import client from '../api/client';  
import { FaUsers, FaMapMarkerAlt, FaRegDotCircle } from 'react-icons/fa'; 

function Salas() {
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]); 
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salasResponse = await client.get('/sala');
        console.log('Salas:', salasResponse.data); // Verifica las salas
        setSalas(salasResponse.data);

        const reservasResponse = await client.get('/reservas');
        console.log('Reservas:', reservasResponse.data); // Verifica las reservas
        setReservas(reservasResponse.data);
      } catch (err) {
        console.error("Error al obtener los datos: ", err);
        setError('No se pudieron obtener las salas o reservas');
      }
    };

    fetchData();
  }, []);

  // Función para obtener el nombre del usuario que reservó la sala
  const getReservaInfo = (salaId) => {
    const reserva = reservas.find(reserva => {
      console.log(reserva); // Verifica la estructura de la reserva
      return reserva.salaId && reserva.salaId._id === salaId && reserva.estado === 'Activo';
    });
  
    if (reserva && reserva.usuarioId) {
      console.log(reserva.usuarioId); // Verifica que contiene los datos del usuario
      return reserva.usuarioId.nombre || 'Usuario desconocido';
    }
    return null;
  };

  // Función para verificar si la sala está activa o inactiva
  const getSalaEstado = (estado) => {
    return estado === 'Activo' ? 'Sala Activa' : 'Sala Inactiva';
  };

  return (
    <div className="salas-container">
      <h2>¡Salas Disponibles!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="salas-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {salas.length > 0 ? (
          salas.map(sala => {
            const nombreReservado = getReservaInfo(sala._id || sala.id); // Verificar si la sala está reservada

            return (
              <div 
                className="sala-card" 
                key={`${sala._id || sala.nombre}-${sala.ubicacion}`}  // Usar un valor único como 'id' o 'nombre'
                style={{ 
                  padding: '15px', 
                  border: '1px solid #ccc', 
                  borderRadius: '10px', 
                  width: 'calc(33% - 20px)', 
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
              >
                <h3>{sala.nombre}</h3>
                <div className="sala-info" style={{ marginTop: '10px' }}>
                  <p><FaUsers /> <strong>Capacidad:</strong> {sala.capacidad}</p>
                  <p><FaRegDotCircle /> <strong>Estado: </strong> {getSalaEstado(sala.estado)}</p>
                  <p><FaMapMarkerAlt /> <strong>Ubicación:</strong> {sala.ubicacion}</p>
                  {/* Mostrar mensaje si está reservada */}
                  {nombreReservado ? (
                    <p style={{ color: 'red' }}><strong>Reservada por:</strong> {nombreReservado}</p>
                  ) : (
                    <p style={{ color: 'green' }}><strong>Disponible</strong></p>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <p>No hay salas disponibles</p>
        )}
      </div>
    </div>
  );
}

export default Salas;
