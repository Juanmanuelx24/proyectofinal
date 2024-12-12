import { useState, useEffect } from 'react';
import client from '../api/client';  
import { FaUsers, FaMapMarkerAlt, FaRegDotCircle } from 'react-icons/fa';  // Importar iconos

function Salas() {
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]); // Para almacenar las reservas
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener las salas
        const salasResponse = await client.get('/sala');
        setSalas(salasResponse.data);  

        // Obtener las reservas con el populate realizado en el backend
        const reservasResponse = await client.get('/reservas');
        setReservas(reservasResponse.data);  
      } catch (err) {
        console.error("Error al obtener los datos: ", err);
        setError('No se pudieron obtener las salas o reservas');
      }
    };

    fetchData();  
  }, []); 

  // Función para verificar si una sala está reservada y obtener el nombre de quien la reservó
  const getReservaInfo = (salaId) => {
    const reserva = reservas.find(reserva => reserva.salaId._id === salaId && reserva.estado === 'Activo');
    
    if (reserva && reserva.usuarioId) {
      // Accede directamente al nombre del usuario
      return reserva.usuarioId.nombre || 'Usuario desconocido'; 
    }
    return null; // Si no está reservada, devuelve null
  };

  return (
    <div className="salas-container">
      <h2>¡Salas Disponibles!</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Aquí se muestran las salas con formato de tarjetas */}
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
                  <p><FaRegDotCircle /> <strong>Estado:</strong> {sala.estado}</p>
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
